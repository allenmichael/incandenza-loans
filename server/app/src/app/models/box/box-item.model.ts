export class BoxItem {
    type: string;
    id: string;
    name: string;
    description: string;
    sequence_id?: string;
    etag?: string;
    path_collection?: {
        entries: Array<BoxItem>,
        total_count: Number
    };
    created_at?: Date;
    modified_at?: Date;
    size?: Number;
    created_by?: Object;
    modified_by?: Object;
    owned_by?: Object;
    parent?: BoxItem;
    item_status?: string;
}