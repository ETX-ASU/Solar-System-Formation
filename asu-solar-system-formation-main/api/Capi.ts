/* eslint-disable no-console */
import { ICapiInternalModel, TCapiSchema, ICAPI, ISimCapi } from 'domainTypes';

type TTick = null | number | NodeJS.Timer;

export class CAPI<M> implements ICAPI<M> {
  readonly debug: boolean;
  model?: ICapiInternalModel;
  readonly SimCapi: ISimCapi | undefined;
  private debounceTimeouts: {
    [key: string]: TTick;
  } = {};

  constructor(debug = false) {
    if (typeof window !== 'undefined') {
      this.SimCapi = (window as any).simcapi;
    }
    this.debug = debug;

    if (typeof window !== 'undefined' && !this.SimCapi) {
      throw new Error('SimCAPI library not found');
    }
  }

  init(schema: TCapiSchema<M>) {
    const schemaKeys = Object.keys(schema);
    const model = schemaKeys.reduce(
      (acc, key) => ({ ...acc, [key]: (schema as any)[key].initialValue }),
      {},
    );

    if (this.SimCapi == null) {
      return;
    }

    this.model = new this.SimCapi.CapiAdapter.CapiModel(model as any);

    if (!this.model) {
      throw new Error('Could not instantiate SimCapi model');
    }

    schemaKeys.forEach((key) => {
      if ((schema as any)[key].hide === true) {
        return;
      }

      this.SimCapi?.CapiAdapter.expose(
        key,
        this.model as ICapiInternalModel,
        (schema as any)[key].options,
      );
    });

    this.SimCapi.Transporter.notifyOnReady();
  }

  onChange<K extends keyof M>(
    variableName: K,
    callback: (newValue: M[K]) => void,
  ) {
    if (!this.model) {
      throw new Error(
        'CAPI is not initialized. You need to call .init, before using .onChange',
      );
    }

    const eventName = `change:${variableName}`;

    // if (this.model._eventsMap[eventName]?.length) {
    //   this.model._eventsMap[eventName] = [];
    // }

    this.model.on(eventName, (_, newValue) => {
      const valueToDisplay = Array.isArray(newValue)
        ? JSON.stringify(newValue)
        : newValue;
      const typeToDisplay = Array.isArray(newValue) ? `Array` : typeof newValue;

      console.log(
        `☀ %cSIM %c- received new value %c"${valueToDisplay}"%c (type: %c${typeToDisplay}%c) for %c${variableName}`,
        'color: #4caf50',
        'color: inherit',
        'color: #ce9178',
        'color: inherit',
        'color: #4ec9b0',
        'color: inherit',
        'color: #f44336',
      );
      callback(newValue);
    });
  }

  set<K extends keyof M>(variableName: K, newValue: M[K]) {
    this.debouncedSendToApi(variableName, newValue);
  }

  get<K extends keyof M>(variableName: K) {
    if (!this.model) {
      throw new Error(
        'CAPI is not initialized. You need to call .init, before using .get',
      );
    }

    return this.model.get(variableName);
  }

  triggerCheck() {
    const timeout = this.debounceTimeouts['__triggerCheck'];

    if (timeout) clearTimeout(timeout as number);

    this.debounceTimeouts['__triggerCheck'] = setTimeout(() => {
      if (this.debug) console.log('Triggering check');
      try {
        this.SimCapi?.Transporter.triggerCheck();
      } catch (error) {
        console.error(error);
      }
    }, 400);
  }

  sendToApi = <K extends keyof M>(variableName: K, value: any) => {
    if (!this.model) {
      throw new Error(
        'CAPI is not initialized. You need to call .init, before using .sendToApi',
      );
    }

    if (this.debug)
      console.log(
        `%c Sending to API: %c${variableName}%c/%c${value}`,
        'color: #03a9f4',
        'color: #f44336',
        'color: #9e9e9e',
        'color: #fff',
      );
    this.model.set(variableName as string, value);
  };

  private debouncedSendToApi = <K extends keyof M>(
    variableName: K,
    value: M[K],
  ) => {
    const timeout = this.debounceTimeouts[variableName as string];

    if (timeout) clearTimeout(timeout as number);
    this.debounceTimeouts[variableName as string] = setTimeout(() => {
      this.sendToApi(variableName, value);
      this.debounceTimeouts[variableName as string] = null;
    }, 400);
  };
}
