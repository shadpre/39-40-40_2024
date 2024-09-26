/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Customer {
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  id: number;
  /**
   * @minLength 3
   * @maxLength 100
   * @pattern ^.*\s+.*$
   */
  name: string;
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * @minLength 3
   * @maxLength 100
   * @pattern ^.*\s+.*$
   */
  address: string;
  phone?: string | null;
}

export interface Order {
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  id: number;
  /** @format date-time */
  orderDate?: string | null;
  /** @format date-time */
  deliveryDate?: string | null;
  status?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number;
  customer?: Customer;
  orderEntries?: OrderEntry[] | null;
}

export interface OrderEntry {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number;
  product?: Paper;
  /** @format int32 */
  orderId?: number;
  order?: Order;
}

export interface Paper {
  /** @format int32 */
  id?: number;
  name?: string | null;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  paperProperties?: PaperProperty[] | null;
  orderEntries?: OrderEntry[] | null;
}

export interface PaperProperty {
  /** @format int32 */
  paperId?: number;
  paper?: Paper;
  /** @format int32 */
  propertyId?: number;
  property?: Property;
}

export interface Property {
  /** @format int32 */
  id?: number;
  propertyName?: string | null;
  paperProperties?: PaperProperty[] | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Api
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customer
     * @name CustomerGetCustomersList
     * @request GET:/api/Customer/GetCustomers
     */
    customerGetCustomersList: (params: RequestParams = {}) =>
      this.request<Customer[], any>({
        path: `/api/Customer/GetCustomers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerCreateNewCustomerCreate
     * @request POST:/api/Customer/CreateNewCustomer
     */
    customerCreateNewCustomerCreate: (data: Customer, params: RequestParams = {}) =>
      this.request<Customer, any>({
        path: `/api/Customer/CreateNewCustomer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderCreateOrderCreate
     * @request POST:/api/Order/CreateOrder
     */
    orderCreateOrderCreate: (
      query: {
        /**
         * @format int32
         * @min 0
         * @max 2147483647
         */
        Id: number;
        /** @format date-time */
        OrderDate?: string;
        /** @format date-time */
        DeliveryDate?: string;
        Status?: string;
        /** @format double */
        TotalAmount?: number;
        /** @format int32 */
        CustomerId?: number;
        /**
         * @format int32
         * @min 0
         * @max 2147483647
         */
        customerId: number;
        /**
         * @minLength 3
         * @maxLength 100
         * @pattern ^.*\s+.*$
         */
        customerName: string;
        /** @format email */
        customerEmail: string;
        /**
         * @minLength 3
         * @maxLength 100
         * @pattern ^.*\s+.*$
         */
        customerAddress: string;
        customerPhone?: string;
        OrderEntries?: OrderEntry[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Order, any>({
        path: `/api/Order/CreateOrder`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrdersDetail
     * @request GET:/api/Order/GetOrders/{CustomerId}
     */
    orderGetOrdersDetail: (customerId: number, params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/Order/GetOrders/${customerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetAllOrdersList
     * @request GET:/api/Order/GetAllOrders
     */
    orderGetAllOrdersList: (params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/Order/GetAllOrders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderUpdateOrderUpdate
     * @request PUT:/api/Order/UpdateOrder/{OrderId}
     */
    orderUpdateOrderUpdate: (
      orderId: number,
      query: {
        /**
         * @format int32
         * @min 0
         * @max 2147483647
         */
        Id: number;
        /** @format date-time */
        OrderDate?: string;
        /** @format date-time */
        DeliveryDate?: string;
        Status?: string;
        /** @format double */
        TotalAmount?: number;
        /** @format int32 */
        CustomerId?: number;
        /**
         * @format int32
         * @min 0
         * @max 2147483647
         */
        customerId: number;
        /**
         * @minLength 3
         * @maxLength 100
         * @pattern ^.*\s+.*$
         */
        customerName: string;
        /** @format email */
        customerEmail: string;
        /**
         * @minLength 3
         * @maxLength 100
         * @pattern ^.*\s+.*$
         */
        customerAddress: string;
        customerPhone?: string;
        OrderEntries?: OrderEntry[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Order, any>({
        path: `/api/Order/UpdateOrder/${orderId}`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPapersList
     * @request GET:/api/Paper/GetPapers
     */
    paperGetPapersList: (params: RequestParams = {}) =>
      this.request<Paper[], any>({
        path: `/api/Paper/GetPapers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperCreatePaperCreate
     * @request POST:/api/Paper/CreatePaper
     */
    paperCreatePaperCreate: (data: Paper, params: RequestParams = {}) =>
      this.request<Paper, any>({
        path: `/api/Paper/CreatePaper`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperUpdatePaperUpdate
     * @request PUT:/api/Paper/UpdatePaper
     */
    paperUpdatePaperUpdate: (
      query?: {
        /** @format int32 */
        Id?: number;
        Name?: string;
        Discontinued?: boolean;
        /** @format int32 */
        Stock?: number;
        /** @format double */
        Price?: number;
        PaperProperties?: PaperProperty[];
        OrderEntries?: OrderEntry[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Paper, any>({
        path: `/api/Paper/UpdatePaper`,
        method: "PUT",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyGetAllPropertiesList
     * @request GET:/api/Property/GetAllProperties
     */
    propertyGetAllPropertiesList: (params: RequestParams = {}) =>
      this.request<Property[], any>({
        path: `/api/Property/GetAllProperties`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyCreatePropertyCreate
     * @request POST:/api/Property/CreateProperty
     */
    propertyCreatePropertyCreate: (
      query?: {
        /** @format int32 */
        Id?: number;
        PropertyName?: string;
        PaperProperties?: PaperProperty[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Property, any>({
        path: `/api/Property/CreateProperty`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyDeleteDelete
     * @request DELETE:/api/Property/Delete/{id}
     */
    propertyDeleteDelete: (id: number, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/api/Property/Delete/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
