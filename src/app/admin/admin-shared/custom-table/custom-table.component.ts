import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from '@angular/cdk/collections';
import { TablePaginationSettingsModel, ColumnSettingsModel } from './table-settings.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
    selector: 'app-custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {
    constructor(public _MatPaginatorIntl: MatPaginatorIntl) { }
    selectedRowIndex = -1;
    @Input() tableAddBtn: string;
    @Input() tableHeading: string

    /**
     * @description Column names for the table
     */
    columnNames: string[] = [];
    /**
     * @description enable selection of rows
     */
    @Input() enableCheckbox: boolean;
    /**
     * @description Allowing/Dis-allowing multi-selection of rows
     */
    @Input() allowMultiSelect: boolean;
    /**
     * @description `sqColumnDefinition` is additional configuration settings provided to `sq-table`.Refer [sqColumnDefinition].
     */
    @Input() sqColumnDefinition: ColumnSettingsModel[];
    /**
     * @description `sqPaginationConfig` is additional configuration settings provided to `sq-table`.Refer [SqTablePaginationSettingsModel].
     */
    @Input() sqPaginationConfig?: TablePaginationSettingsModel;
    /**
     * @description Data which will be displayed in tabular format
     */
    @Input() rowData: object[];
    /**
     * @description variable to store selection data
     */
    selection = new SelectionModel<{}>();
    /**
     * @description Local variable to convert JSON data object to MatTableDataSource
     */
    dataSource: MatTableDataSource<{}>;
    /**
     * @description ViewChild to get the MatSort directive from DOM
     */
    @ViewChild(MatSort) sort: MatSort;
    /**
     * @description ViewChild to get the MatPaginator directive from DOM
     */
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    /**
     * @description Lifecycle hook that is called after a component's view has been fully initialized.
     */
    @Output() getSelectedRows = new EventEmitter();
    @Output() emitformId = new EventEmitter();
    @Input() isShowfilter: boolean = true;
    @Output() PageChanged = new EventEmitter();
    @Output() openmodal = new EventEmitter();
    @Output() OpenStatusDialogue = new EventEmitter();
    @Output() openlead = new EventEmitter();
    @Output() openplan = new EventEmitter();

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this._MatPaginatorIntl.itemsPerPageLabel = 'Rows per page:';
        // this.paginator.length = this.sqPaginationConfig?.totalElements;
    }
    /**
     * @hidden
     */
    /**
     * Lifecycle hook that is called when any data-bound property of a datasource changes.
     */
    ngOnChanges() {
        this.dataSource = new MatTableDataSource(this.rowData);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
        this.getSelectedRows.emit(this.selection.selected);

    }
    /** Gets the selected rows array on row select. */
    rowSelect() {
        this.getSelectedRows.emit(this.selection.selected);
    }
    /**
     * @hidden
     */
    /**
     * Initialize the directive/component after Angular first displays the data-bound properties
     * and sets the directive/component's input properties
     */
    ngOnInit() {
        for (const column of this.sqColumnDefinition) {
            this.columnNames.push(column.name);
        }
        // Condition to add selection column to the table
        if (this.enableCheckbox) {
            this.columnNames.splice(0, 0, 'select');
            this.sqColumnDefinition.splice(0, 0, {
                'name': 'select',
                'displayName': '#'
            });
        }
        // Setting selection model
        this.selection = new SelectionModel<{}>(this.allowMultiSelect, []);
        this.dataSource = new MatTableDataSource(this.rowData);
    }
    /** Highlights the selected row on row click. */
    highlight(row: any) {
        this.selectedRowIndex = row.position;
    }
    getServerData(event: any) {
        console.log(event, 'event');
        this.PageChanged.emit(event);
    }
    OpenDialogue(event: any, _id?: number) {
        let data = {
            method: event,
            id: _id ? _id : null
        }
        this.openmodal.emit(data);
    }
    statusclicked(event: any) {
        this.OpenStatusDialogue.emit(event)
    }
    applyFilter(event: any) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openleadpopUp(item: any) {
        this.openlead.emit(item);
    }
    openplanpopUp(item: any) {
        this.openplan.emit(item);
    }
    openViewMode(item: any) {
        let data = {
            method: 'view',
            id: item._id ? item._id : null
        }
        this.openmodal.emit(data);
    }
    convertboolean(value: any) {
        let val = 'No'
        if (value) {
            val = value == true ? 'Yes' : 'No';
        }
        return val
    }
}
