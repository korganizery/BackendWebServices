import { Button, Space } from "antd-mobile";

export default function Order() {
    return (
        <>
            <h1>MobileDemo</h1>
            <Space wrap>
                <Button color='primary' fill='solid'>
                    Solid
                </Button>
                <Button color='primary' fill='outline'>
                    Outline
                </Button>
                <Button color='primary' fill='none'>
                    None
                </Button>
            </Space>
        </>
    );
}
