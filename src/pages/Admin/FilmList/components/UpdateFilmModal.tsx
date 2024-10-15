import { updateFilm } from '@/services/films';
import { FilmInfo } from '@/types/film';
import { ModalForm, ProFormSelect, ProFormText, ProFormDigit, ProForm } from '@ant-design/pro-components';
import { message } from "antd";
import { useEffect } from "react";

interface UpdateFilmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filmInfo?: FilmInfo;
  onFinish: () => void;
}

const UpdateFilmModal = ({ open, onOpenChange, onFinish, filmInfo }: UpdateFilmModalProps) => {
  const [form] = ProForm.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...filmInfo,
      });
    }
  }, [open, filmInfo]);


  const handleCreate = async (values: FilmInfo) => {
    const res = await updateFilm(values);
    if (res.code === 200) {
      onFinish();
      return true;
    }

    message.error(res.message);
    return false;
  }

  return (
    <ModalForm
    form={form}
      title="修改电影"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
      <ProFormText name="filmId" label="电影ID" readonly />
      <ProFormText name="filmName" label="电影名称" />
      <ProFormText name="filmType" label="电影类型" />
      <ProFormText name="language" label="电影语言" />
      <ProFormText name="filmDuration" label="电影时长" />
      <ProFormText name="synopsis" label="简介" />
      <ProFormText name="price" label="票价" />
      <ProFormText name="posters" label="海报" />
      <ProFormText name="boxOffice" label="票房" />
    </ModalForm>
  );
}


export default UpdateFilmModal;
