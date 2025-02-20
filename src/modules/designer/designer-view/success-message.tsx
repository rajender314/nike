import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components'
import {
  SuccessMessageContainer,
  SuccessLogo,
  SuccessMsg,
} from './designer-components'
import { stringType } from 'aws-sdk/clients/iam'

type Props = {
  orderId: string
}

export default function SuccessMessage({ orderId }: Props) {
  const navigate = useNavigate()

  return (
    <SuccessMessageContainer>
      <SuccessLogo>
        <svg width="180px" height="65px" viewBox="0 0 180 65" version="1.1">
          <g
            id="NIKE_LOGO"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd">
            <path
              d="M19.8553469,64.4870508 C14.4920898,64.2727866 10.1041373,62.79695 6.67312217,60.0558462 C6.01832724,59.5321919 4.45802352,57.9621527 3.93455493,57.2999657 C2.54323052,55.5405981 1.5973136,53.8283319 0.966396199,51.9285844 C-0.975029403,46.0806503 0.0241527421,38.4068527 3.82435102,29.9849779 C7.07812156,22.7748038 12.0988282,15.6237371 20.8582025,5.71956043 C22.1485067,4.26219463 25.9909498,0 26.0157457,0 C26.0249293,0 25.8155419,0.364803223 25.5519708,0.80903196 C23.2744233,4.64546891 21.3256508,9.16441112 20.2640198,13.0765793 C18.5586142,19.3539654 18.7643282,24.741047 20.8664678,28.9182748 C22.3165676,31.7960643 24.8025842,34.2887323 27.5980902,35.6666727 C32.4920623,38.0780682 39.6571534,38.2775555 48.407344,36.2503579 C49.0097921,36.1099777 78.8621954,28.1406436 114.746426,18.5403157 C150.630657,8.93906432 179.995408,1.08979191 180,1.09625678 C180.010102,1.10456875 96.6307398,36.9845821 53.3472344,55.5987819 C46.4925512,58.5458379 44.6594926,59.2902213 41.4369465,60.4280378 C33.199204,63.337228 25.8201337,64.7253275 19.8553469,64.4870508 Z"
              id="Nike"
              fill="#282A34"
              fillRule="nonzero"></path>
          </g>
        </svg>
      </SuccessLogo>
      <SuccessMsg>
        Thank You! Your Design #{orderId}
        <br />
        has been submitted successfully
      </SuccessMsg>
      <Button
        variant="primary"
        size="large"
        width="240px"
        onClick={() => navigate('/orders')}>
        Go to Designs
      </Button>
    </SuccessMessageContainer>
  )
}
