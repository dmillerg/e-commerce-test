import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SECTION_METADATA } from '../consts/meta-data';

@Injectable({ providedIn: 'root' })
export class MetaDataService {
  constructor(private title: Title, private meta: Meta) {}

  public init(section: keyof typeof SECTION_METADATA) {
    const metadata = SECTION_METADATA[section];

    if (!metadata) {
      console.warn(`No se encontró metadata para la sección: ${section}`);
      return;
    }

    this.title.setTitle(metadata.title);

    this.meta.updateTag({ name: 'description', content: metadata.description });

    this.meta.updateTag({ property: 'og:title', content: metadata.title });
    this.meta.updateTag({ property: 'og:description', content: metadata.description });
    this.meta.updateTag({ name: 'twitter:title', content: metadata.title });
    this.meta.updateTag({ name: 'twitter:description', content: metadata.description });
  }

  public setProductMeta(
    title: string,
    description: string,
    price: number,
    rating: number,
    imageUrl: string,
    category:string
  ) {
    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:price:amount', content: price.toString() });
    this.meta.updateTag({ property: 'og:rating', content: rating.toString() });
    this.meta.updateTag({ property: 'product:category', content: category });

    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:label1', content: 'Precio' });
    this.meta.updateTag({ name: 'twitter:data1', content: price.toString() });
    this.meta.updateTag({ name: 'twitter:label2', content: 'Rating' });
    this.meta.updateTag({ name: 'twitter:data2', content: rating.toString() });
    this.meta.updateTag({ name: 'twitter:label3', content: 'Categoría' });
    this.meta.updateTag({ name: 'twitter:data3', content: category });
  }
}
