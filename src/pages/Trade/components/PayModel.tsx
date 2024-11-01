import {Modal} from 'antd';
import { TradeInfo } from '@/types/trade';
import {PayInfo} from '@/types/pay';
import React from 'react';
import { message } from 'antd';


interface PayModelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tradeinfo:TradeInfo;
    onFinish: () => void;
}

const PayModel = ({open, onOpenChange, onFinish, tradeinfo} : PayModelProps) => {
   
    const ref = React.useRef<HTMLDivElement>(null);



    const handleCreate = async (values: PayInfo) => {
        // const res = await updatePay(values);
        // if (res.code === 200) {
        //     onFinish();
        //     return true;
        // }

        // message.error(res.message);
        // return false;
    };

    return (
        <Modal
            title="支付"
            open={open}
            onCancel={() => onOpenChange(false)}
        >
            <div onClick={() => {
                console.log(tradeinfo);
            }}>sss</div>
        </Modal>
    );
}

export default PayModel;