import React, { FunctionComponent } from 'react';

interface IProps {
  tags: string[];
}

const Tags: FunctionComponent<IProps> = ({ tags }) => {
  return (
    <>
      <p>Tags:</p>{' '}
      {tags.map((tag, index) => {
        return <p key={index}>{tag}</p>;
      })}
    </>
  );
};
export default Tags;
