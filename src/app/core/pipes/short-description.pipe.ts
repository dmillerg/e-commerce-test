import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
  standalone: true
})
export class ShortDescriptionPipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number = 15, wordSafe: boolean = false): string {
    if (!value) return '';
    const text = value.trim();

    if (text.length <= limit) return text;

    if (wordSafe) {
      const slice = text.slice(0, limit);
      const lastSpace = slice.lastIndexOf(' ');
      const safe = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
      return `${safe}…`;
    }

    return `${text.slice(0, limit)}…`;
  }
}
