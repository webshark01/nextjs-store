import React from 'react';
import { Separator } from '../ui/separator';

const SectionTitle = ({ sectionTitle }: { sectionTitle: string }) => {
  return (
    <>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">
        {sectionTitle}
      </h2>
      <Separator />
    </>
  );
};

export default SectionTitle;
