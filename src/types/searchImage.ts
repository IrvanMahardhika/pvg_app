export interface ListImageRequest {
  page: number;
}

export interface SearchImageRequest {
  query?: string;
  page: number;
}

export interface SearchImageItem {
  id: string;
  width: number;
  height: number;
  description: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  links: {
    download: string;
    download_location: string;
  };
  user: {
    name: string;
  };
}

export interface ResultSearchImage {
  status: number;
  data: {
    total: number;
    total_pages: number;
    results: SearchImageItem[];
  };
}

export interface ResultListImage {
  status: number;
  data: SearchImageItem[];
}

export interface SearchImageState {
  resultListImage?: ResultListImage;
  resultSearchImage?: ResultSearchImage;
}
