export interface BaseParamEntity {
  page: number;
  limit: number;

  // custom parameters
  [key: string]: any;
}

export interface BaseReadOneParamEntity {
  [key: string]: any;
  id: number;
}

export interface BaseQueryReadOneEntity {
  [key: string]: any;
}
