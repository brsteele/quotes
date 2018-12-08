import React, { FunctionComponent } from 'react';

interface IProps {
  tags: string[];
  className?: any;
}

const Tags: FunctionComponent<IProps> = ({ tags, ...rest }) => {
  return (
    <>
      {tags.map((tag, index) => {
        return (
          <p {...rest} key={index}>
            {tag}
          </p>
        );
      })}
    </>
  );
};
export default Tags;
