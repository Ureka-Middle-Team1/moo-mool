'use client';

import { Badge } from '@/components/ui/badge';

interface TagBadgeProps {
  tag: string;
  index: number;
}

export default function TagBadge({ tag, index }: TagBadgeProps) {
  const colorClass =
    index === 0
      ? 'bg-red-100 text-red-500'
      : index === 1
      ? 'bg-indigo-100 text-indigo-500'
      : 'bg-gray-100 text-gray-600';

  return (
    <Badge className={`px-2 py-1 text-[10px] font-medium rounded-md ${colorClass}`}>
      {tag}
    </Badge>
  );
}