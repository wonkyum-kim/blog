'use client';

import PageLayout from '@/components/page-layout';
import Accordion from './Accordion';

export default function ProjectPage() {
  return (
    <PageLayout title='Practice' description='만들어보기'>
      <Accordion />
    </PageLayout>
  );
}
