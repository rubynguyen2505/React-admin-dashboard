import { Col, Row } from 'antd'
import { Edit } from '@refinedev/antd'
export const EditPage = () => {
    return (
        <Row gutter={[32, 32]}>
            <Col xs={24} xl={12}>
                <Edit/>
            </Col> 
        </Row>
  )
}


