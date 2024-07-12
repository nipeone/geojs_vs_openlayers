export const renderer = 'webgl';
export const geojsonPath = '../data/features.json';

export async function getData() {
    try{
        const response = await fetch(geojsonPath)
        if (response.ok) {
            const features = await response.json();
            return features
        }
    }catch(error){
        console.error(error);
    }
}
