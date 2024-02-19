export const getTrendingGifs = async () => {
  try {
    const API_KEY = 'oPxq4IEL6uyO4WdgWkwnnpzzQOqQCOMd';
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.error('e', e);
  }
};
