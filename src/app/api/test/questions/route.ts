// app/api/test/questions/route.ts
import mysql, { RowDataPacket } from "mysql2/promise";
import { NextResponse } from "next/server";
type Question = {
  id: number;
  stage: string;
  difficulty: string | null;
  is_bonus: boolean;
  question_text: string;
  example_type: string;
  example_content: string;
  choices: string;
};

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const STAGES = ["SNS", "Youtube", "Chat", "Calling", "Books", "Saving"];
const DIFFICULTIES = ["low", "medium", "high"];

export async function GET() {
  let conn;
  try {
    conn = await pool.getConnection();

    const questions: Record<string, Record<string, any | null>> = {};

    for (const stage of STAGES) {
      questions[stage] = {};

      for (const difficulty of DIFFICULTIES) {
        const [rows] = await conn.query<Question & RowDataPacket[]>(
          `SELECT id, stage, difficulty, question_text, example_type, example_content, choices
           FROM questions
           WHERE stage = ? AND difficulty = ?
           ORDER BY RAND()
           LIMIT 1`,
          [stage, difficulty]
        );
        questions[stage][difficulty] = (rows[0] as Question) || null;
      }

      const [bonusRows] = await conn.query<Question & RowDataPacket[]>(
        `SELECT id, stage, difficulty, question_text, example_type, example_content, choices
         FROM questions
         WHERE stage = ? AND difficulty = 'bonus'
         ORDER BY RAND()
         LIMIT 1`,
        [stage]
      );
      questions[stage]["bonus"] = (bonusRows[0] as Question) || null;
    }

    conn.release();

    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("DB Error:", error);
    if (conn) conn.release();

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
