export interface ICapiFieldOptions {
  type?: CAPI_TYPES;
  alias?: string;
  allowedValues?: Array<string | number>; // TODO: Make sure this works for number fields
  readonly?: boolean;
  writeonly?: boolean;
}

export interface ICapiField {
  initialValue: any;
  hide?: boolean;
  options?: ICapiFieldOptions;
}

export type TCapiSchema<M> = {
  [key in keyof M]: ICapiField;
};

export interface ICapiInternalModel {
  set: (key: string, value: any) => void;
  on: (key: string, callback: TCapiCallback) => void;
  [key: string]: any;
}

export type TCapiCallback = (model: ICapiInternalModel, newValue: any) => void;

export interface ICAPI<M> {
  SimCapi: ISimCapi | undefined;
  model?: ICapiInternalModel;
  init(schema: TCapiSchema<M>): void;
  onChange<K extends keyof M>(
    variableName: K,
    callback: (newValue: M[K]) => void,
  ): void;
  set<K extends keyof M>(variableName: K, newValue: M[K]): void;
  get<K extends keyof M>(variableName: K): any;
  triggerCheck(): void;
}

export interface ISimCapi {
  CapiAdapter: any;
  Transporter: any;
}

export enum CAPI_TYPES {
  ARRAY = 3,
  ARRAY_POINT = 7,
  BOOLEAN = 4,
  ENUM = 5,
  MATH_EXPR = 6,
  NUMBER = 1,
}
