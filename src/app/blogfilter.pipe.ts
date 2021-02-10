import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'blogFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.title.toLocaleLowerCase().includes(searchText) || it.authorId.name.toLocaleLowerCase().includes(searchText) || it._id.toLocaleLowerCase().includes(searchText);

    });
  }
}
