import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

// TODO: 배포 후 수정하기
const webUrl = 'http://localhost:3000';

// TODO: 배포 후 수정하기
const defaultImage = `.`;

export default function metadata({
  title,
  description: desc,
  path,
  image,
}: MetadataProps): Metadata {
  const description = desc + ' | wonkyum';

  const images = webUrl + (image ?? defaultImage);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: webUrl + path,
      siteName: 'wonkyum',
      images,
      locale: 'ko_KR',
    },
  };
}
