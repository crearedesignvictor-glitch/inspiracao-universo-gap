import React from 'react';

export const Ribbon: React.FC = () => {
  const item = (
    <span>
      CRIATIVIDADE <b>✳</b> CIÊNCIA <b>✳</b> HISTÓRIAS <b>✳</b> INFÂNCIA <b>✳</b> TEATRO <b>✳</b> FUTURO <b>✳</b>
    </span>
  );

  return (
    <div aria-hidden="true" className="ribbon">
      <div className="ribbon-inner">
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
};
