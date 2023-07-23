export interface SearchImageRequest {
  query?: string;
  page: number;
}

export interface SearchImageItem {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  links: {
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

export interface SearchImageState {
  resultSearchImage?: ResultSearchImage;
}
