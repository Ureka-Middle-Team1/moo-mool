import convert, { ElementCompact } from "xml-js";

export function parseSmartChoiceXml(xmlData: string): any[] {
  // xml -> json 변환
  const jsonData = convert.xml2js(xmlData, {
    compact: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
  }) as ElementCompact;

  const rawItems = jsonData?.root?.items?.item;

  // LG U+ 것만 필터링
  const filteredItems = Array.isArray(rawItems)
    ? rawItems.filter((item) => item.v_tel?._text === "LGU+")
    : rawItems?.v_tel?._text === "LGU+"
      ? [rawItems]
      : [];

  return filteredItems;
}
