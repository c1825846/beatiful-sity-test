export interface IUser {
    id: number
    username: string
    name: string
    companyName: string
    website: string
}

export interface IFetchedUser {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lng: string
            lat: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}
