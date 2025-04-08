import { useState } from "react";
import { useTranslation, Trans } from "next-i18next";
import confetti from "canvas-confetti";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface Props {
  isOpen: boolean;
  openSuccessModal: () => void;
  close: () => void;
  locale: string;
}
export default function StartTodayModal({
  openSuccessModal,
  isOpen,
  close,
  locale,
}: Props) {
  const { t } = useTranslation("business");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { campaign_type, campaign_name, lead_source } = router.query;
  const [governorates, setGovernorates] = useState([
    {
      englishName: "Cairo",
      arabicName: "القاهرة",
    },
    {
      englishName: "Alexandria",
      arabicName: "الإسكندرية",
    },
    {
      englishName: "Giza",
      arabicName: "الجيزة",
    },
    {
      englishName: "Luxor",
      arabicName: "الأقصر",
    },
    {
      englishName: "Aswan",
      arabicName: "أسوان",
    },
    {
      englishName: "Asyut",
      arabicName: "أسيوط",
    },
    {
      englishName: "Beheira",
      arabicName: "البحيرة",
    },
    {
      englishName: "Beni Suef",
      arabicName: "بني سويف",
    },
    {
      englishName: "Dakahlia",
      arabicName: "الدقهلية",
    },
    {
      englishName: "Damietta",
      arabicName: "دمياط",
    },
    {
      englishName: "Faiyum",
      arabicName: "الفيوم",
    },
    {
      englishName: "Gharbia",
      arabicName: "الغربية",
    },
    {
      englishName: "Ismailia",
      arabicName: "الإسماعيلية",
    },
    {
      englishName: "Kafr El Sheikh",
      arabicName: "كفر الشيخ",
    },
    {
      englishName: "Matrouh",
      arabicName: "مطروح",
    },
    {
      englishName: "Minya",
      arabicName: "المنيا",
    },
    {
      englishName: "Monufia",
      arabicName: "المنوفية",
    },
    {
      englishName: "New Valley",
      arabicName: "الوادي الجديد",
    },
    {
      englishName: "North Sinai",
      arabicName: "شمال سيناء",
    },
    {
      englishName: "Port Said",
      arabicName: "بورسعيد",
    },
    {
      englishName: "Qalyubia",
      arabicName: "القليوبية",
    },
    {
      englishName: "Qena",
      arabicName: "قنا",
    },
    {
      englishName: "Red Sea",
      arabicName: "البحر الأحمر",
    },
    {
      englishName: "Sharqia",
      arabicName: "الشرقية",
    },
    {
      englishName: "Sohag",
      arabicName: "سوهاج",
    },
    {
      englishName: "South Sinai",
      arabicName: "جنوب سيناء",
    },
    {
      englishName: "Suez",
      arabicName: "السويس",
    },
  ]);

  return (
    <>
      <Dialog.Root
        modal
        open={isOpen}
        onOpenChange={(open) => {
          if (open) {
            return;
          }

          close();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 animate-fade-in bg-gray-500 opacity-60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-lg origin-center -translate-x-1/2 -translate-y-1/2 animate-fade-in flex-col overflow-auto rounded bg-white p-8 shadow-lg">
            <Dialog.Close asChild>
              <button
                className="absolute end-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full"
                aria-label={t("START_TODAY_MODAL_CLOSE_LABEL")}
                disabled={isLoading}
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>

            <Dialog.Title className="mb-4 text-brand-primary-dark">
              <Trans t={t} i18nKey="START_TODAY_MODAL_TITLE" />
            </Dialog.Title>

            <div className="flex flex-col items-center">
              <p className="mb-6 text-center">
                <Trans t={t} i18nKey="START_TODAY_MODAL_PARAGRAPH" />
              </p>
              <form
                className="flex w-full flex-col gap-4"
                method="POST"
                action="/api/business-lead"
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const values = {
                    ...Object.fromEntries(formData.entries()),
                    date: dayjs().format("DD/MM/YYYY hh:mm a"),
                    Campaign_Name: campaign_name,
                    Campaign_Type: campaign_type,
                    Lead_Source: lead_source || "website",
                  };
                  setIsLoading(true);
                  try {
                    await fetch("/api/business-lead", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    });
                    close();
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                    });
                    openSuccessModal();
                  } catch (error) {
                    setHasError(true);
                    console.log(error);
                  }
                  setIsLoading(false);
                }}
              >
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="companyName"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans
                      t={t}
                      i18nKey="START_TODAY_MODAL_COMPANY_NAME_LABEL"
                    />
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="Company"
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="numberOfEmployees"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans
                      t={t}
                      i18nKey="START_TODAY_MODAL_NUMBER_OF_EMPLOYEES_LABEL"
                    />
                  </label>
                  <input
                    type="text"
                    id="numberOfEmployees"
                    name="Accurate_Number_of_Employees"
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="industry"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans t={t} i18nKey="START_TODAY_MODAL_INDUSTRY_LABEL" />
                  </label>
                  <select
                    id="industry"
                    name="Industry"
                    className="flex-1"
                    disabled={isLoading}
                    defaultValue=""
                  >
                    <option value=""></option>
                    <option value="Finance">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_FINANCE"
                      />
                    </option>
                    <option value="Tourism">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_TOURISM"
                      />
                    </option>
                    <option value="Construction">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_CONSTRUCTION"
                      />
                    </option>
                    <option value="Health">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_HEALTH"
                      />
                    </option>
                    <option value="Education">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_EDUCATION"
                      />
                    </option>
                    <option value="Industrial">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_INDUSTRIAL"
                      />
                    </option>
                    <option value="Trade">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_TRADE"
                      />
                    </option>
                    <option value="Agriculture">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_AGRICULTURE"
                      />
                    </option>
                    <option value="Services">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_SERVICES"
                      />
                    </option>
                    <option value="IT&Telecom">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_IT_&_TELECOM"
                      />
                    </option>
                    <option value="Retail">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_RETAIL"
                      />
                    </option>
                    <option value="Energy">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_ENERGY"
                      />
                    </option>
                    <option value="Automotive">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_AUTOMOTIVE"
                      />
                    </option>
                    <option value="Real Estate">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_REAL_ESTATE"
                      />
                    </option>
                    <option value="NGO">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_NGO"
                      />
                    </option>
                    <option value="Other">
                      <Trans
                        t={t}
                        i18nKey="START_TODAY_MODAL_INDUSTRY_OPTION_OTHER"
                      />
                    </option>
                  </select>
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="governorate"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans
                      t={t}
                      i18nKey="START_TODAY_MODAL_GOVERNORATE_LABEL"
                    />
                  </label>
                  <select
                    id="governorate"
                    name="City"
                    className="flex-1"
                    disabled={isLoading}
                    defaultValue=""
                  >
                    <option value=""></option>
                    {governorates
                      .sort((a, b) =>
                        a.englishName.localeCompare(b.englishName)
                      )
                      .map((governorate) => (
                        <option
                          value={governorate.englishName}
                          key={governorate.englishName}
                        >
                          {locale === "en"
                            ? governorate.englishName
                            : governorate.arabicName}
                        </option>
                      ))}
                  </select>
                </fieldset>
                <hr />
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="firstName"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans t={t} i18nKey="START_TODAY_MODAL_FIRST_NAME_LABEL" />
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="First_Name"
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="lastName"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans t={t} i18nKey="START_TODAY_MODAL_LAST_NAME_LABEL" />
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="Last_Name"
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="businessType"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans
                      t={t}
                      i18nKey="START_TODAY_MODAL_BUSINESS_TYPE_LABEL"
                    />
                  </label>
                  <input
                    type="text"
                    id="businessType"
                    name="Industry2"
                    className="flex-1"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="email"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans t={t} i18nKey="START_TODAY_MODAL_EMAIL_LABEL" />
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    required
                    className="flex-1"
                    inputMode="email"
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="flex w-full items-center gap-5">
                  <label
                    htmlFor="phone"
                    className="shrink-0 basis-1/3 text-end"
                  >
                    <Trans t={t} i18nKey="START_TODAY_MODAL_MOBILE_LABEL" />
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="Phone"
                    required
                    className="flex-1"
                    pattern="^\d*$"
                    inputMode="tel"
                    disabled={isLoading}
                  />
                </fieldset>
                {hasError && (
                  <p className="animate-shake text-red-500">
                    <Trans t={t} i18nKey="START_TODAY_MODAL_ERROR" />
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    className="mt-4 rounded border border-black px-3 py-1 transition-shadow solid-shadow-brand-primary active:shadow-sm active:shadow-brand-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Trans t={t} i18nKey="START_TODAY_MODAL_LOADING_LABEL" />
                    ) : (
                      <Trans t={t} i18nKey="START_TODAY_MODAL_SUBMIT_LABEL" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
