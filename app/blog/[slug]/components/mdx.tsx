import { useMDXComponent } from 'next-contentlayer/hooks';

interface Props {
  code: string;
}

const components = {
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      target='_blank'
      rel='noopener'
      {...props}
      className='text-blue-700 dark:text-sky-500'
    />
  ),
};

export function Mdx({ code }: Props) {
  const Component = useMDXComponent(code);

  return (
    <div className='prose prose-slate dark:prose-invert max-w-full'>
      <Component components={components} />
    </div>
  );
}
