export class CreatePostDto {
    cover_image_url: string;
    title: string;
    body: string;
    slug: string;
    tags: string[];
    userId: string;
}