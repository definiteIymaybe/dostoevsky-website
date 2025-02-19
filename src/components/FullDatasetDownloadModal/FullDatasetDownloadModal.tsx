/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import classes from "./FullDatasetDownloadModal.module.css";
import cn from "clsx";
import Modal from "src/components/ui-kit/Modal";
import { getCsv, Table } from "src/utils/csv";
import { saveAs } from "file-saver";
import { T, useLocale } from "react-targem";
import Typography from "src/components/ui-kit/Typography";
import Input from "src/components/ui-kit/Input";
import Button from "src/components/ui-kit/Button";
import { FORMSUBMIT_ID } from "src/config/vars";
import { subscribeToEmail } from "src/utils/emails-service";
import { sendClickEvent } from "src/utils/analytics";

export type { Table };

interface FullDatasetDownloadModalProps {
  children?: React.ReactNode;
  isShowing: boolean;
  loadingDataset: boolean;
  tables?: Table[];
  toggle(): void;
  type: "full" | "clause";
  /** without extention */
  filename: string;
}

const FullDatasetDownloadModal: React.FC<FullDatasetDownloadModalProps> = ({
  isShowing,
  toggle,
  loadingDataset,
  tables,
  type,
  filename,
}: FullDatasetDownloadModalProps) => {
  const [email, setEmail] = useState("");
  const [telegramNick, setTelegramNick] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useLocale();

  const handleDownload = () => {
    if (loadingDataset || !tables) return false;
    sendClickEvent({
      event:
        type === "full" ? "full_dataset_download" : "clause_dataset_download",
      label: filename,
    });
    const csvContent = getCsv(tables, 0);
    saveAs(csvContent, `${filename}.csv`);
    toggle();
  };

  const handleEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleTelegramNickChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setTelegramNick(e.currentTarget.value);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      // https://mailchimp.com/help/host-your-own-signup-forms/
      try {
        await subscribeToEmail(email);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("telegram-nick", telegramNick);
    params.append("subject", "Пользователь скачал полный датасет");
    setIsLoading(true);
    try {
      await fetch(`https://formsubmit.io/send/${FORMSUBMIT_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        referrerPolicy: "unsafe-url",
        redirect: "manual",
      });
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    handleDownload();
  };

  return (
    <Modal
      isShowing={isShowing}
      size="lg"
      onHideButtonClick={toggle}
      title={<T message="Скачать данные" />}
      isCentered
    >
      <form
        onSubmit={handleFormSubmit}
        className={cn(classes.fullDatasetDownloadModalWrapper)}
      >
        <div className={cn(classes.fullDatasetTwoForms)}>
          <div>
            <Typography font="serif">
              <i>
                <T message="Если вы оставите свой email, мы будем время от времени присылать вам что-нибудь полезное!" />
              </i>
            </Typography>
            <Input
              type="email"
              value={email}
              placeholder={t("Ваш e-mail")}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <Typography font="serif">
              <i>
                <T message="Ваше имя в Telegram, если хотите присоединиться к нашему сообществу" />
              </i>
            </Typography>
            <Input
              type="text"
              value={telegramNick}
              placeholder={t("Ваше имя в Telegram")}
              onChange={handleTelegramNickChange}
            />
          </div>
        </div>
        <Typography>
          <T message="При использовании данных, пожалуйста, указывайте ссылку на Достоевский и делитесь с нами своими материалами." />
        </Typography>
        <Button color="secondary" type="submit">
          {isLoading || loadingDataset ? (
            <T message="Загрузка..." />
          ) : (
            <T message="Скачать" />
          )}
        </Button>
      </form>
    </Modal>
  );
};

export default FullDatasetDownloadModal;
