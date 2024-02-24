import type Metadata from "./Metadata";

export default interface ListResultResponse<T> {
    metadata: Metadata;
    data: T[];
}
