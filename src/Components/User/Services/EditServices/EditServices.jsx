import { useEffect, useState } from 'react';
import { Form, Button, notification, Row, Col } from 'antd';
import {
	uploadDocumentApi,
	updateDocumentApi,
	getDocumentsByUserApi,
	deleteDocumentsByIdApi,
} from '../../../../API/doc';
import { getAccessTokenApi } from '../../../../API/auth';
import useAuth from '../../../../Hooks/useAuth';
import Dropzone from 'react-dropzone-uploader';
import './EditServices.scss';

export default function EditServices(props) {
	const { service, setIsVisibleModal, setReloadServices } = props;
	const [reload, setReload] = useState(false);
	const { globalVar } = useAuth();
	const { globalUser } = globalVar;
	const { user } = globalUser;
	const token = getAccessTokenApi();
	const [documents, setDocuments] = useState([]);
	const document = {
		user: user.id,
		service: service.serviceId,
	};

	useEffect(() => {
		getDocumentsByUserApi(token, document).then((result) => {
			setDocuments(result);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [service._id, reload]);

	const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
		return (
			<div>
				{previews}

				<div {...dropzoneProps}>{files.length < maxFiles && input}</div>

				{files.length > 0 && submitButton}
			</div>
		);
	};

	const CustomLayout = () => {
		const getUploadParams = () => ({ url: 'https://httpbin.org/post' });

		const handleSubmit = (files) => {
			files.forEach((f) => {
				uploadDocumentApi(token, f.file, user.id).then((result) => {
					result.docStored.service = service.serviceId;
					result.docStored.name = f.file.name;
					result.docStored.size = f.file.size;
					updateDocumentApi(token, result.docStored, user.id).then((result) => {
						notification['success']({
							message: result.message,
						});
						setReload(!reload);
						setReloadServices(true);
						setIsVisibleModal(false);
					});
				});
			});
		};

		return (
			<Dropzone
				getUploadParams={getUploadParams}
				LayoutComponent={Layout}
				onSubmit={handleSubmit}
				inputContent='Drop Files'
				accept='.pdf'
			/>
		);
	};

	const handleOnRemove = (params) => {
		deleteDocumentsByIdApi(token, params).then((result) => {
			notification['success']({
				message: result.message,
			});
			setReload(!reload);
		});
	};

	return (
		<Form className='form-edit-services'>
			<h3>{service.name}</h3>
			<h6>{service.description}</h6>
			<CustomLayout />
			<Form.Item>
				<Row className='add-service-form__req'>
					{documents.length > 0 &&
						documents.map((row, index) => (
							<RowContent {...row} onRemove={(params) => handleOnRemove(params)} key={index} />
						))}
				</Row>
			</Form.Item>
		</Form>
	);
}

function RowContent(params) {
	const { name, onRemove } = params;
	return (
		<>
			<Col span={19}>
				<label htmlFor=''>{name}</label>
			</Col>
			<Col span={4}>
				<Button onClick={() => onRemove(params)}>Delete</Button>
			</Col>
		</>
	);
}
