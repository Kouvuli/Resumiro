import React from 'react'
import { styled } from '@mui/material/styles'
const CustomCustomerSupportIcon = styled('svg')(({ theme }) => ({
    '& path': {
        fill: theme.palette.text.primary
    }
}))

const CustomerSupportIcon = () => {
    return (
        <CustomCustomerSupportIcon
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_8_357)">
                <path
                    d="M36.4623 15.9752C36.1994 7.12165 28.916 0 19.9998 0C11.0837 0 3.80031 7.12165 3.53733 15.9752L2.35278 17.1598V25.1932L3.52925 26.3696V31.8431C3.52925 35.0435 6.13286 37.6471 9.33318 37.6471H10.7904C11.2761 39.0164 12.5838 40 14.1175 40H16.4704C18.0052 40 19.3136 39.015 19.7984 37.6442C19.8656 37.6454 19.933 37.6471 19.9998 37.6471C25.6813 37.6471 30.435 33.5987 31.528 28.2353H34.6048L37.6469 25.1932V17.1598L36.4623 15.9752ZM19.9998 2.35294C26.9827 2.35294 32.7968 7.44933 33.9203 14.1176H31.528C30.435 8.7542 25.6813 4.70588 19.9998 4.70588C14.3184 4.70588 9.56471 8.7542 8.47169 14.1176H6.07937C7.2029 7.44933 13.017 2.35294 19.9998 2.35294ZM29.1138 14.1176C25.3107 14.1063 22.6245 14.3379 20.4097 11.1004L19.3343 9.52839L18.41 11.1938C17.0634 13.6204 15.2498 14.1176 12.941 14.1176H10.8859C11.9333 10.0629 15.6224 7.05882 19.9998 7.05882C24.3773 7.05882 28.0664 10.0629 29.1138 14.1176ZM8.23514 25.8824H6.36949L4.70572 24.2186V18.1344L6.36949 16.4706H8.23514V25.8824ZM5.8822 31.8431V28.2353H8.46941C8.91231 30.4294 9.972 32.4435 11.5419 34.0611C11.2128 34.4127 10.9547 34.8311 10.7904 35.2941H9.33318C7.43027 35.2941 5.8822 33.746 5.8822 31.8431ZM16.4704 37.6471H14.1175C13.4687 37.6471 12.941 37.1194 12.941 36.4706C12.941 35.8219 13.4687 35.2941 14.1175 35.2941H16.4704C17.1191 35.2941 17.6469 35.8219 17.6469 36.4706C17.6469 37.1194 17.1191 37.6471 16.4704 37.6471ZM29.4116 25.8824C29.4116 31.072 25.1895 35.2941 19.9998 35.2941C19.9324 35.2941 19.8644 35.2928 19.7965 35.2912C19.31 33.9234 18.0031 32.9412 16.4704 32.9412C14.0547 32.9465 14.0933 32.9291 13.7922 32.9568C11.7496 31.1665 10.5881 28.6166 10.5881 25.8824V16.4706H12.941C15.0231 16.4706 17.5588 16.1273 19.5216 13.7384C22.1115 16.4524 25.2763 16.4706 28.1173 16.4706H29.4116V25.8824ZM35.294 24.2186L33.6302 25.8824H31.7646V16.4706H33.6302L35.294 18.1344V24.2186Z"
                    fill="#3A3A3A"
                />
            </g>
            <defs>
                <clipPath id="clip0_8_357">
                    <rect width="40" height="40" fill="white" />
                </clipPath>
            </defs>
        </CustomCustomerSupportIcon>
    )
}

export default CustomerSupportIcon
