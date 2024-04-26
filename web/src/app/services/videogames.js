import { API_URL, STRAPI_URL } from "../config";

export async function getGames( { page = 1 } ) {
    const res = await fetch(`${API_URL}/videogames?populate[platforms][fields][0]=name&populate[cover][fields][0]=url
    &pagination[page]=${page}&pagination[pageSize]=1`);
    if (!res.ok) {
      throw new Error('Failed to fetch games');
    }
    const { data, meta } = await res.json();
    const { pagination } = meta;
    //mapping de datos antes de retonarlos
   /* return data.map(({attributes, id}) => {
      const {title, description} = attributes
      const {url: cover} = attributes.cover.data.attributes;
      return {
        title,
        description,
        cover
      }
    })*/
    return {data, pagination};
  }

  export function getCoverImage ({ attributes }){
    const  url  = attributes.cover.data.attributes.url;
    return `${STRAPI_URL}${url}`;
  }

  export function getDescription({ attributes }) {
    let description = '';
    attributes.description.forEach(paragraph => {
        paragraph.children.forEach(child => {
            if (child.type === 'text') {
                description += child.text;
            }
        });
        description += '\n'; // Add a newline after each paragraph
    });
    return description.trim(); // Remove any leading or trailing whitespace
}

