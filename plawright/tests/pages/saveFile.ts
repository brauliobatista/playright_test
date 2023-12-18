/**
 * Braulio Batista
 * 
 * December, 2023
 * 
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export class SaveFilePage {

  /**
   * wright file
   * @param filename  
   * @param data 
   * @returns 
   */
  async syncWriteFile(filename: string, data: any) {

    writeFileSync(join(__dirname, filename), data, {
      flag: 'w',
    });

    const contents = readFileSync(join(__dirname, filename), 'utf-8');

    return contents;
  }

}
