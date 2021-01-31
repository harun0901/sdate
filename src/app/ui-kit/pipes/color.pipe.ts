import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  colors = {
    'cornflower-blue': '#5E81F4',
    'jacksons-purple': '#232F92',
    riptide: '#7CE7AC',
    geraldine: '#FF808B',
    'cream-can': '#F4BE5E',
    waterloo: '#8181A5',
    mercury: '#E5E5E5',
    shark: '#1C1D21',
    'royal-blue': '#436FEA',
    'sea-nymph': '#81A5A1',
    'silver-chalice': '#AAAAAA',
    'athens-gray': '#EEEEEF',
    'mine-shaft': '#3E3E3E',
    denim: '#1B51E5',
    alabaster: '#FAFAFA',
    black: '#000000',
    'whisper-04': 'rgba(245, 245, 250, 0.4)',
    whisper: '#F5F5FA',
    'color-purple': '#9698D6'
  };

  transform(value: string): string {
    // @ts-ignore
    return this.colors[value] || value;
  }

}
