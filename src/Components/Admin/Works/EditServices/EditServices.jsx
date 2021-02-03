import { useEffect, useState } from 'react';
import { Form, Button, Row, Col, notification } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { getDocumentsByUserApi, dowloadDocumentsApi } from '../../../../API/doc';
import { getAccessTokenApi } from '../../../../API/auth';
import './EditServices.scss';

export default function EditServices(props) {
	const { service } = props;
	const token = getAccessTokenApi();
	const [documents, setDocuments] = useState([]);
	const document = {
		user: service.userId,
		service: service.serviceId,
	};

	useEffect(() => {
		getDocumentsByUserApi(token, document).then((result) => {
			setDocuments(result);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [service._id]);

	return (
		<Form className='form-edit-services'>
			<Form.Item>
				<Row className='add-service-form__req'>
					{documents.length > 0 && documents.map((row, index) => <RowContent {...row} key={index} />)}
				</Row>
			</Form.Item>
		</Form>
	);
}

const downloadDocument = (document) => {
	const token = getAccessTokenApi();
	dowloadDocumentsApi(token, document)
		.then((result) => {
			window.open(result.file, '_blank');
		})
		.catch((err) => {
			notification['error']({
				message: err.message,
			});
		});
};

function RowContent(params) {
	return (
		<>
			<Col span={19}>
				<label htmlFor=''>{params.name}</label>
			</Col>
			<Col span={4}>
				<Button onClick={() => downloadDocument(params.document)}>
					<CloudDownloadOutlined />
				</Button>
			</Col>
		</>
	);
}
