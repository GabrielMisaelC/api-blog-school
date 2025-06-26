export class CreatePostDto {
    id: Int16Array;
    title: string;
    content?: string;
    published: boolean;
    teacherid: Int16Array;
}