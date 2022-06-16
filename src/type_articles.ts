interface ImageFormatDto {
    url: string
    mime: string
    name: string
    width: number
    height: number
}
interface ImageDto {
    id: number
    alternativeText: string
    url: string
    mime: string
    name: string
    width: number
    height: number
    formats: {
        large?: ImageFormatDto,
        medium?: ImageFormatDto,
        small?: ImageFormatDto,
        thumbnail: ImageFormatDto
    }
}
export interface PartnerDto {
    id: number
    name: string
    slug: string
    email?: string
    website?: string
    phone?: string
    description: string
    published_at: string
    created_at: string
    updated_at: string
    logo: ImageDto
}
export interface ArticleDto {
    id: number
    title: String
    slug: string
    content?: string
    order: number
    published_at: string
    created_at: string
    updated_at: string
    image: ImageDto
    banner: ImageDto
    partners: PartnerDto[]
}