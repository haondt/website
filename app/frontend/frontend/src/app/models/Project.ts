export class ProjectModel {
    title: string = "";
    source: string | null = null;
    description: string = "";
    tech: string[] = [];
    images: string[] = [];
    public constructor(init?:Partial<ProjectModel>) {
        Object.assign(this, init);
    }
}