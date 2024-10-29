import { addFilm } from "@/services/films";
import { FilmInfo } from "@/types/film";
import { ModalForm, ProFormSelect, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { message } from "antd";

interface CreateFilmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish: () => void;
}

const CreateFilmModal = ({ open, onOpenChange, onFinish }: CreateFilmModalProps) => {

  const handleCreate = async (values: FilmInfo) => {
    const res = await addFilm(values);
    if (res.code === 200) {
      onFinish();
      return true;
    }

    message.error(res.message);
    return false;
  }

  return (
    <ModalForm
      title="新增电影"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
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


export default CreateFilmModal;
