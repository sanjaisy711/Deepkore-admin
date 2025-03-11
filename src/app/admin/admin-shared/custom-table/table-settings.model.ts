// This interface contains properties of table pagination settings
/**
 * @description SqTablePaginationSettingsModel is a custom type which is used in `app-table` for pagination properties
 */

export interface TablePaginationSettingsModel {
    /**
     * @description enable Pagination of rows
     */
    enablePagination: boolean;
    /**
     * @description Number of items to display on a page. By default, set to 50.
     */
    pageSize: number;
    /**
     * @description the set of provided page size options to display to the user.
     */
    pageSizeOptions: number[];
    /**
     * @description Whether to show the first/last buttons UI to the user.
     */
    showFirstLastButtons: boolean;
    /**
    * @description Current page Number.
    */
    pageNo: number;
    /**
   * @description Short By.
   */
    sortBy: string;
    /**
     * @description Shorting Direction.
     */
    sortDirection: string;
    /**
     * @description Search Text.
     */
    search: string;
    totalElements: number;
    pageIndex: number;
    buId: string;
}
// This interface contains properties of table column settings
/**
 * @description ColumnSettingsModel is a custom type which is used in `-table` for column properties
 */
export interface ColumnSettingsModel {
    /**
     * @description Icon for the column header row
     */
    icon?: string;
    /**
     * @description The column name to be used for fetching/binding data
     */
    name: string;
    /**
     * @description The column name to be displayed
     */
    displayName: string;
    /**
     * @description Property for disabling sorting
     */
    disableSorting?: boolean;

    isAction?: number;

    isDate?:boolean;
    isPopup?:boolean;
    isBooleanValue?:boolean;

}

export interface ApiResponse<T> {
    status: any;
    error: {
        erroCode: string;
        errorMessage: string;
        errorDetails: string;
    };
    message: {
        messageDescription: string;
        messageCode: string;
    };
    data: T;

}

export interface PagedResponse<T> extends ApiResponse<PagedData<T>> {

}
export interface PagedData<T> {
    content: T[];
    pageable: {
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        }
        offset: number;
        pageSize: number;
        pageNumber: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface PagedRequestOptions {
    pageNo?: any;
    pageSize?: any;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    search?: string;
    tabIndex?: number;
}

