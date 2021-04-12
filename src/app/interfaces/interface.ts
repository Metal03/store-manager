export interface ProductI {
    code:          string,
    name:          string,
    description?:  string,
    price?:        number,
    discount?:     number,
    colors?:       string[],     
    clasification?:number,
    category?:     number,
    photo?:        string[],
    status?:       number,
    type:          number,
    sizer:         string[],
    sizez:         number[],
    sizep:         number[],
    accesory:      boolean,
    date:          number
}

/**
 * CATEGORIES
 * 1. CAMISAS
 * 2. VESTIDOS
 * 3. PANTALON
 * 4. SHORT
 * 5. ZAPATOS
 * 6. TODOS
 */

export interface CategoryI {
    id?:           number;
    name?:       string;
}

/**
 * CLASIFICACION
 * 1. HOMBRES
 * 2. MUJERES
 * 3. NIÑOS
 * 4: TODOS
 */

export interface ClasificationI {
    id?:           number;
    name?:         string;
}


export interface SizerI {
    size?:         string,
}

export interface SizezI {
    size?:         number,
}

export interface SizepI {
    size?:         number,
}