export const SERVER = 'http://127.0.0.1:3000'

export const API_CONFIG = {
    login:[					'/sessions/users',				'post'],
    logout:[				'/sessions/users',				'delete'],
    getHomeData:[			'/counts',						'get'],
    getUserData:[			'/users/list',					'get'],
    addCategories:[			'/categories',					'post'],
    getlevelCategories:[	'/categories/levelCategories',	'get'],
    getCategoriesList:[		'/categories/list',				'get'],
    updateCategoriesName:        ['/categories/name','put'],
    updateCategoriesMobileName:  ['/categories/mobileName','put'],
    updateCategoriesOrder:       ['/categories/order','put'],
    updateCategoriesIsShow:      ['/categories/isShow','put'],
} 