import { ChangeDetectionStrategy, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { TemplateHeaderDirective } from './template-header.directive';

const constants = {
  PAGE_SIZE : 2,
  TEMPLATE: {
    header: 'header',
    body: 'body'
  }
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent implements OnInit {
 public TEMPLATE = constants.TEMPLATE;
  @Input() data: any = [];
  @Input() cols: any = [];
  @Input() pageSize = constants.PAGE_SIZE;

  page = 0;
  items: any[] = [];

  pageData = {} as {
    start: number;
    end: number
  }

  @ContentChildren(TemplateHeaderDirective, {read: TemplateHeaderDirective})
  public templates!: QueryList<TemplateHeaderDirective>

  constructor() { }

  ngOnInit(): void {
    this.initPagination();
  }

  public get tableHeight() {
    const columnHeight = 80;
    const rowHeight = 80;
    const marginBottom = 20;
    return {
      height: `${(rowHeight + marginBottom) + this.pageSize + columnHeight}`
    }
  }

  private initPagination(){
    this.paginate(this.page, this.pageSize);
  }

  public get size(): number {
    return this.data.length;
  }

  public get totalPages():number {
    return Math.ceil(this.size / this.pageSize);
  }

  private paginate(page: number, pageSize:number){
    const startPortion = page * pageSize;
    let endPortion = startPortion + pageSize;
    if(endPortion > this.size) {
      endPortion =- endPortion - this.size;
    }
    this.saveCalculatedPortion(startPortion, endPortion);
    this.items = [...this.data.slice(startPortion, endPortion)]
  }

  private saveCalculatedPortion(start: number, end: number) {
    this.pageData = {
      ...this.pageData,
      start,
      end
    }
  }

  prev() {
    if(this.page > 0) {
      this.page -= 1;
      this.paginate(this.page, this.pageSize)
    }
  }

  next() {
    if(this.page < this.totalPages && this.pageData.end < this.size){
      this.page +=1;
      this.paginate(this.page, this.pageSize)
    }
  }
}
