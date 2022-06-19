import { Injectable } from '@nestjs/common';

import { ClickEntry } from '@pipeline-example/util/clicker-entities';

@Injectable()
export class AppService {
  entries: ClickEntry[] = [];

  getData(): ClickEntry[] {
    return this.entries;
  }

  addData(entry: ClickEntry) {
    this.entries.push(entry);
  }

  deleteData() {
    this.entries = [];
  }
}
