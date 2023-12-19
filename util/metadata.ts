import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

// const defaultImage = ``;

export default function metadata({
  title,
  description: desc,
  path,
  image,
}: MetadataProps): Metadata {
  const description = desc + ' | wonkyum';

  // const images = image ?? defaultImage;

  return {
    metadataBase: new URL('http://blog-wonkyum-kim.vercel.app'),
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'wonkyum',
      // images,
      locale: 'ko_KR',
    },
  };
}
