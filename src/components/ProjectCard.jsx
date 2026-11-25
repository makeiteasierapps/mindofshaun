import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const textLink =
    'inline-flex min-h-11 items-center text-bone underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass';

export function ProjectCard({ project }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h3 className="m-0">{project.title}</h3>
                </CardTitle>
                <CardDescription>{project.lede}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <p className="mb-0">{project.body}</p>
                {project.image ? (
                    <div className="flex justify-center overflow-hidden rounded-[8px] border border-line bg-panel p-3">
                        <img
                            src={project.image.src}
                            alt={project.image.alt}
                            width={project.image.width}
                            height={project.image.height}
                            loading="lazy"
                            decoding="async"
                            className="h-auto max-h-96 w-auto max-w-full object-contain"
                        />
                    </div>
                ) : null}
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {project.stack.map((tag) => (
                        <li key={tag}>
                            <Badge variant="outline">{tag}</Badge>
                        </li>
                    ))}
                </ul>
                {project.href ? (
                    <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={textLink}
                    >
                        {project.linkLabel}
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                ) : null}
            </CardFooter>
        </Card>
    );
}
