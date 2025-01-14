import React, { useState } from "react";
import classes from "./FaqPage.module.css";
import cn from "clsx";
import Container from "src/components/ui-kit/Container";
import Typography from "src/components/ui-kit/Typography";
import Accordion, { AccordionNode } from "src/components/ui-kit/Accordion";
import SinglePageLayout from "src/components/SinglePageLayout";
import { useLocale, T, WithLocale } from "react-targem";
import { Menu, MenuItem } from "src/components/Menu";
import FaqPageHowWasCollected from "./FaqPageHowWasCollected";
import FaqPageUploadFieldsNParameterTree from "./FaqPageUploadFieldsNParameterTree";
import Tooltip from "src/components/ui-kit/Tooltip";
import { Helmet } from "react-helmet";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const getFaqData = (t: WithLocale["t"]) => [
  {
    id: "glossary",
    title: "Глоссарий",
    accordion: true,
    data: [
      {
        title: "Амнистия и помилование",
        slug: "glossary-amnesty",
        content: (
          <>
            <Typography>
              <T message="И амнистия, и помилование — это полное или частичное освобождение от уголовной ответственности, что подразумевает отмену или ослабление наказания и снятие судимости. Однако между ними есть несколько отличий." />
            </Typography>
            <Typography>
              <b>
                <T message="Амнистия:" />
              </b>
              <br />
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="выносится Государственной Думой в отношении индивидуально неопределенного круга лиц — амнистированные не перечисляются поименно;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="возможна уже с момента возбуждения уголовного дела;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="не принимает во внимание желание осужденных — решение об амнистии, как правило, продиктовано политическими интересами." />
                </Typography>
              </li>
            </ul>

            <Typography>
              <i>
                <T message="Пример:" />{" "}
              </i>
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_34249/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="Постановление об амнистии 2001 года" />
              </OutboundLink>
              <T message=" в отношении несовершеннолетних и женщин — под еe действие попали примерно 9% всех заключенных." />
            </Typography>
            <Typography>
              <b>
                <T message="Помилование:" />
              </b>
              <br />
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="выносится Президентом в отношении конкретного человека;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="возможно только после вступления в силу обвинительного приговора;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="обычно инициируется самим осужденным — для этого нужно подать ходатайство." />
                </Typography>
              </li>
            </ul>

            <Typography>
              <i>
                <T message="Пример:" />{" "}
              </i>
              <OutboundLink
                href="http://kremlin.ru/events/president/news/51998"
                target="_blank"
                rel="noreferrer"
              >
                <T message="Указ о помиловании" />
              </OutboundLink>
              <T message=" украинской военнослужащей Надежды Савченко, осужденной по делу об убийстве журналистов ВГТРК в Донбассе." />
            </Typography>
          </>
        ),
      },
      {
        title: "Действие закона во времени",
        slug: "glossary-in-time",
        content: (
          <>
            <Typography>
              <T message="Согласно уголовному кодексу, при обвинении применяется тот закон, который действовал во время совершения преступления" />
              {` `}(
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/ac18caeb0eee735b4e56cd3a734a5d718dbc174f/"
                target="_blank"
                rel="noreferrer"
              >
                ст. 9 УК
              </OutboundLink>
              ).{` `}
              <T message="Предположим, гражданин Д. совершил грабеж и через три года его арестовали. За это время законодательство изменилось, но, согласно принципу действия закона во времени, судить Д. будут по старой статье, действительной на момент грабежа." />
            </Typography>
            <Typography>
              <T message="При этом в некоторых случаях закон всe же имеет обратную силу. Так, если впоследствии наказание стало мягче, к обвиняемому применят новые, более благоприятные правила, а если статью отменили — снимут обвинение или судимость. Если же закон был ужесточен, судить будут по старой статье" />
              {` `}(
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/deb6a4399a2515bf42c937987286e526c1c4a4ec/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 10 УК" />
              </OutboundLink>
              ).{` `}
              <T message="В результате в уголовную статистику иногда попадают дела по тем статьям, которые уже не действительны — это усложняет анализ данных и может исказить результаты." />
            </Typography>
          </>
        ),
      },
      {
        title: "Дополнительное наказание",
        slug: "glossary-additional",
        content: (
          <>
            <Typography>
              <T message="Уголовный кодекс выделяет три типа наказаний:" />
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="основные — они выступают самостоятельными наказаниями;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="дополнительные — могут прибавляться к основным, чтобы сделать приговор строже;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="смешанные — используются в обоих качествах." />
                </Typography>
              </li>
            </ul>

            <Typography>
              <T message="Решение о прибавлении дополнительного наказания к основному по большей части зависит от судьи, хотя в юридической практике заметна корреляция: если состав простой и без отягчающих обстоятельств — то есть судят за одно преступление, — суд скорее ограничится основным наказанием; если же в деле есть" />
              {` `}
              <mark>
                <a href="#glossary-main-and-additional">
                  <T message="дополнительный состав" />
                </a>
              </mark>
              {` `}
              <T message="или отягчающие обстоятельства — в приговоре с большей вероятностью будет еще и дополнительное наказание." />
            </Typography>
            <Typography>
              <T message="В качестве дополнительного наказания могут применять" />
              {` `}
              <mark>
                <a href="#glossary-fine">
                  <T message="штраф" />
                </a>
              </mark>
              ,{` `}
              <T message="запрет на определeнную деятельность, лишение специального, воинского или почетного звания и другие меры" />
              {` `}(
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/7506104f82c79e377964e1b7698216c74807ada9/#:~:text=%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5%20%D0%B8%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%B2%D0%B8%D0%B4%D1%8B%20%D0%BD%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D0%B9,-1.&text=%D0%A8%D1%82%D1%80%D0%B0%D1%84%2C%20%D0%BB%D0%B8%D1%88%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B0%D0%B2%D0%B0%20%D0%B7%D0%B0%D0%BD%D0%B8%D0%BC%D0%B0%D1%82%D1%8C%20%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5,%D1%82%D0%B0%D0%BA%20%D0%B8%20%D0%B4%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%20%D0%BD%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D0%B9"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 45 УК" />
              </OutboundLink>
              ).
            </Typography>
          </>
        ),
      },
      {
        title: "Неоконченное преступление",
        slug: "glossary-unfinished",
        content: (
          <>
            <Typography>
              <T message="Преступление считается неоконченным, если имело место только приготовление или покушение" />{" "}
            </Typography>
            <Typography>
              <b>
                <T message="Приготовление" />
              </b>
              {` `}—{` `}
              <T
                message="это любые намеренные действия, предшествовавшие преступлению или
              покушению, например, подготовка орудий, поиск соучастников или
              сговор."
              />
            </Typography>
            <Typography>
              <b>
                <T message="Покушение" />
                {` `}—{` `}
              </b>
              <T message="это неудачная попытка совершения преступления, предпринятая осознанно. Бездействие тоже может считаться покушением. Например, если кассир специально не закрыл кассу, чтобы позже украсть из неe деньги. " />
            </Typography>
            <Typography>
              <T message="Небольшие и средние неоконченные преступления — причинение легкого вреда здоровью, клевета или убийство в состоянии аффекта — не преследуются по закону, а вот тяжкие и особо тяжкие случаи — умышленное убийство, грабеж, изнасилование — уголовно наказуемы, но оцениваются мягче. Так, приговор за приготовление не может превышать половины максимального срока за такое же оконченное преступление, а приговор за покушение — трех четвертей." />
            </Typography>
          </>
        ),
      },
      {
        title: "Обстоятельства, исключающие преступность",
        slug: "glossary-exclude-crime",
        content: (
          <>
            <Typography>
              <T message="Формально противоправные действия — например, нанесение тяжкого вреда здоровью, — не преследуются по закону, если они были спровоцированы особыми внешними факторами. Причинение вреда в этих обстоятельствах не влечет уголовной ответственности. Уголовный кодекс выделяет шесть таких ситуаций" />
              {` `}(
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/e006626bacd0a7618ebd53e66bf76f2bd2554a48/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="гл. 8 УК" />
              </OutboundLink>
              ):
            </Typography>

            <ul className={cn(classes.ulWithAdditionalMargin)}>
              <li>
                <Typography variant="span">
                  <b>
                    <T message="Оборона" />
                  </b>
                  <br />
                  <T message="Защита личности и прав обороняющегося или других лиц. Важно, чтобы масштаб обороны соответствовал опасности, иначе это может быть уголовно наказуемо." />
                  <br />
                  <i>
                    <T message="Пример: " />
                  </i>
                  <T message="оборона при нападении в парке." />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <b>
                    <T message="Задержание лица, совершившего преступление" />
                  </b>
                  <br />
                  <T message="Вред может быть причинен, если преступник совершил оконченное преступление и пытается скрыться." />
                  <br />
                  <i>
                    <T message="Пример: " />
                  </i>
                  <T message="при попытке задержать вора вы сломали его руку. " />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <b>
                    <T message="Крайняя необходимость" />
                  </b>
                  <br />
                  <T message="Ситуация, в которой одно неправомерное деяние необходимо, чтобы исключить другое более тяжкое деяние. Или это может быть конфликт двух взаимоисключающих прав, когда реализация одного значит нарушение другого." />
                  <br />
                  <i>
                    <T message="Пример: " />
                  </i>
                  <T message="в экстренной ситуации врач вынужден спасти того пациента, чей риск смерти выше." />
                </Typography>
              </li>

              <li>
                <Typography variant="span">
                  <b>
                    <T message="Физическое или психическое принуждение" />
                  </b>
                  <br />
                  <T message="Если действия выполняются в результате принуждения, а не по воле самого человека, они не рассматриваются как преступление." />
                  <br />
                  <i>
                    <T message="Пример: " />
                  </i>
                  <T message="с помощью пыток человека заставляют оклеветать соседа по лестничной клетке." />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <b>
                    <T message="Обоснованный риск" />
                  </b>
                  <br />
                  <T message="Риск, связанный с научной, коммерческой, предпринимательской деятельностью, производством или управлением персоналом." />
                  <br />
                  <i>
                    <T message="Пример: " />
                  </i>
                  <T message="технические испытания ракеты, которые могут привести к жертвам." />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <b>
                    <T message="Исполнение приказа" />
                  </b>
                  <br />
                  <T message="При соответствующих полномочиях и обязанности исполнить приказ, должностное лицо может причинить вред. Если приказ или распоряжение заведомо незаконны, преступность не исключается." />
                  <br />
                  <i>
                    <T message="Пример: " />
                  </i>
                  <T message="убийство на войне." />
                </Typography>
              </li>
            </ul>
          </>
        ),
      },
      {
        title:
          "Освобождение от наказания и прекращение уголовного преследования",
        slug: "glossary-exempt",
        content: (
          <>
            <Typography>
              <T message="Главное отличие между освобождением от наказания и прекращением уголовного преследования заключается в том, что в первом случае человек остается виновным в преступлении, несмотря на послабления в мере наказания" />
              {` `}(
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/7f4ae31b28b80f570149eb1ef0ae71c8e18219fb/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="гл. 12 УК" />
              </OutboundLink>
              ), <T message="во втором случае все обвинения снимают" />
              {` `}(
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_34481/edffa91bf1d9429762988ebe463830a4759bbb3d/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 27 УПК" />
              </OutboundLink>
              ).
            </Typography>
            <Typography>
              <b>
                <T message="Освобождение от наказания" />
              </b>
              {` `}
              <T message="применяется только после вступления обвинительного приговора в силу. Оно может быть связано с болезнью или аддикцией осужденного, изменением обстановки, истечением сроков давности обвинительного приговора." />
              <br />
              <i>
                <T message="Пример" />:
              </i>
              {` `}
              <T message="в 2017 году адвокат К." />{" "}
              <OutboundLink
                href="https://www.advgazeta.ru/novosti/osvobozhdenie-ot-nakazaniya-po-ugolovnomu-delu-ne-povod-vosstanovit-status-advokata/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="была освобождена" />
              </OutboundLink>{" "}
              <T message="от штрафа в 100 тыс. рублей за дачу взятки из-за истечения срока давности уголовного преследования." />
            </Typography>
            <Typography>
              <b>
                <T message="Прекращение уголовного преследования" />
              </b>
              <T message="возможно по" />
              {` `}
              <mark>
                <a href="#glossary-rehabilitation">
                  <T message="реабилитирующим и нереабилитирующим основаниям," />
                </a>
              </mark>
              {` `}
              <T message="а также при отсутствии процессуальных условий для продолжения дела." />
              <br />
              <i>
                <T message="Пример" />
              </i>
              :{` `}
              <T message="В 2019 году" />{" "}
              <OutboundLink
                href="https://zona.media/chronicle/golunov-free#24356"
                target="_blank"
                rel="noreferrer"
              >
                <T message="было прекращено" />
              </OutboundLink>{" "}
              <T
                message="
              уголовное преследование в отношении журналиста Ивана Голунова,
              которого обвиняли в покушении на сбыт наркотиков. МВД объяснило
              это решение тем, что причастность Голунова к преступлению не была
              доказана."
              />
            </Typography>
          </>
        ),
      },
      {
        title: "Основной и дополнительный состав преступления",
        slug: "glossary-main-and-additional",
        content: (
          <>
            <Typography>
              <T message="Состав — это конкретные действия, которые преследуются по закону и являются основанием для уголовной ответственности. Если в деле фигурируют сразу несколько преступлений, то выделяют основной дополнительные составы. Предположим, помимо убийства обвиняемый совершил кражу и употреблял наркотические вещества в общественном месте. Наиболее тяжкое из этих преступлений — умышленное убийство. При условии, что суд будет рассматривать эти дела вместе, именно оно будет являться основным составом, а менее весомые деяния — дополнительным." />
            </Typography>
            <Typography>
              <T message="Наказание назначается отдельно за каждое преступление и зависит в первую очередь от основного состава, а дополнительные складываются с ним по специальным формулам или поглощаются" />{" "}
              (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/1750f77d5ab2edf9b591ecb4451727086bda5ac0/#:~:text=%D0%9D%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D1%81%D0%BE%D0%B2%D0%BE%D0%BA%D1%83%D0%BF%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%BF%D1%80%D0%B5%D1%81%D1%82%D1%83%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9,-1.&text=%D0%95%D1%81%D0%BB%D0%B8%20%D1%85%D0%BE%D1%82%D1%8F%20%D0%B1%D1%8B%20%D0%BE%D0%B4%D0%BD%D0%BE%20%D0%B8%D0%B7,%D1%87%D0%B0%D1%81%D1%82%D0%B8%D1%87%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%B8%D0%BB%D0%B8%20%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D0%B3%D0%BE%20%D1%81%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D0%B9"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 69 УК" />
              </OutboundLink>
              ).{" "}
              <T message="Чтобы было проще разобраться в опубликованных данных, мы подготовили" />{" "}
              <mark>
                <T message="подробный материал" />
              </mark>{" "}
              <T message="о составах преступления, вынесении наказания и сборе информации по этим показателям." />
            </Typography>
          </>
        ),
      },
      {
        title:
          "Принудительное лечение (Принудительные меры медицинского характера)",
        slug: "glossary-compulsory-treatment",
        content: (
          <>
            <Typography>
              <T message="Если психическое состояние обвиняемого представляет опасность для него самого или окружающих, суд может назначить обязательное лечение" />{" "}
              (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/b963255e6a9dd06510f473d59a4e0ddc1e936d8b/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="гл. 15 УК" />
              </OutboundLink>
              ). <T message="Это происходит в следующих случаях:" />
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="преступление было совершено в состоянии невменяемости;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="психическое расстройство наступило после преступления, так что назначить и исполнить наказание — невозможно;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="обвиняемый вменяем, но страдает психическим расстройством и опасен;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="обвиняемый совершил преступление против половой неприкосновенности несовершеннолетнего." />
                </Typography>
              </li>
            </ul>

            <Typography>
              <T message="Время в психиатрическом стационаре засчитывается осужденному в срок наказания, а если его признают выздоровевшим, уголовное дело будет возобновлено." />
            </Typography>
          </>
        ),
      },
      {
        title: "Обязательные, принудительные и исправительные работы",
        slug: "glossary-obligatory",
        content: (
          <>
            <Typography>
              <T message="Все виды работ, предусмотренные Уголовным кодексом, применяются только в качестве" />{" "}
              <mark>
                <T message="основных видов наказаний" />
              </mark>{" "}
              —{" "}
              <T message="это означает, что они могут выступать только как самостоятельные наказания, но не могут быть дополнением к другим мерам." />
            </Typography>
            <Typography>
              <b>
                <T message="Обязательные работы — общественно полезный труд" />
              </b>{" "}
              (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/a65dac489bf58afbf78d6fbc5ad58048769b2a93/#dst100211"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 49 УК" />
              </OutboundLink>
              )
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="назначаются за преступления небольшой и средней тяжести;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="включают общественно полезный труд в свободное от работы или учебы время;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="срок исполнения — от 60 до 480 часов, не больше 4 часов в день." />
                </Typography>
              </li>
            </ul>

            <Typography>
              <i>
                <T message="Пример" />
              </i>
              :{" "}
              <T message="причинение легкого вреда здоровью, угроза убийством, нарушение неприкосновенности жилища, повторное наказание за вождение в состоянии опьянения." />
            </Typography>
            <Typography>
              <b>
                <T message="Исправительные работы — дополнительный налог на зарплату" />
              </b>{" "}
              (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/fd830e7cf3c0e1074ca35a580314701483ff611a/#dst102387"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 50 УК" />
              </OutboundLink>
              )
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="назначаются за преступления небольшой и средней тяжести;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="подразумевают взимание от 5 до 20% заработной платы осужденного в доход государства;" />
                  <Tooltip
                    tip={t(
                      "Если у осужденного нет постоянного места работы, его назначает суд. Как правило, это самый низкооплачиваемый труд: грузчик, дворник, уборщик."
                    )}
                  />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="срок исполнения — от 2 месяцев до 2 лет." />
                </Typography>
              </li>
            </ul>

            <Typography>
              <i>
                <T message="Пример" />
              </i>
              :{" "}
              <T message="кражи, неуплата алиментов, нарушение неприкосновенности жилища или оскорбление представителя власти." />
            </Typography>
            <Typography>
              <b>
                <T message="Принудительные работы — альтернатива лишению свободы" />
              </b>{" "}
              (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/fbf561e8e76ded47846e0b625229d7933bbcc93a/#:~:text=%D0%9F%D1%80%D0%B8%D0%BD%D1%83%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B,-(%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B0%20%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC&text=1.,%D0%B7%D0%B0%20%D1%81%D0%BE%D0%B2%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D1%8F%D0%B6%D0%BA%D0%BE%D0%B3%D0%BE%20%D0%BF%D1%80%D0%B5%D1%81%D1%82%D1%83%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%D0%BF%D0%B5%D1%80%D0%B2%D1%8B%D0%B5"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 53.1 УК" />
              </OutboundLink>
              )
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="назначаются за небольшие и средние преступления, а также за тяжкие, если они совершены впервые;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="осужденные живут в исправительном центре ФСИН и получают заработную плату, из которой также от 5 до 20% уходит в доход государства;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="срок исполнения — от 2 месяцев до 5 лет." />
                </Typography>{" "}
              </li>
            </ul>
          </>
        ),
      },
      {
        title:
          "Реабилитирующие и нереабилитирующие основания для прекращения дела",
        slug: "glossary-rehabilitation",
        content: (
          <>
            <Typography>
              <b>
                <T message="К реабилитирующим основаниям" />
              </b>
              <T message="прекращения уголовного преследования относятся:" />
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="непричастность подозреваемого к совершению преступления;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="отсутствие события преступления;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="отсутствие в деянии" />{" "}
                  <mark>
                    <a href="#glossary-main-and-additional">
                      <T message="состава преступления" />
                    </a>
                  </mark>{" "}
                  (
                  <OutboundLink
                    href="https://www.consultant.ru/document/cons_doc_LAW_34481/71f0df8ac07c113c0fc317c4e9f3d84c19bd671c/#dst101567"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <T message="ст. 212 УПК" />
                  </OutboundLink>
                  ).
                </Typography>{" "}
              </li>
            </ul>

            <Typography>
              <T message="В этом случае суд признает за бывшим обвиняемым право на возмещение имущественного и морального вреда и восстановление в трудовых, пенсионных, жилищных и иных правах" />{" "}
              (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_34481/3911b8a97895714db18d9b21fea27d1667ddfe4e/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 133 УПК" />
              </OutboundLink>
              ).
            </Typography>
            <Typography>
              <T message="К" />
              <b>
                <T message="нереабилитирующим основаниям" />
              </b>
              <T message="относятся:" />
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="истечение сроков давности уголовного преследования;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <OutboundLink
                    href="http://www.consultant.ru/document/cons_doc_LAW_10699/2ba2a1c7f4543c624328bd19c1c703a7056a3b2f/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <T message="деятельное раскаяние " />
                  </OutboundLink>
                  <T message="подозреваемого;" />
                </Typography>
              </li>
              <li>
                <Typography variant="span">
                  <T message="примирение сторон;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="смерть подозреваемого или обвиняемого;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="акт амнистии;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="принятия закона, устраняющего преступность или наказуемость деяния;" />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="возмещение ущерба, если преступление касалось экономической деятельности;" />
                </Typography>{" "}
              </li>
            </ul>

            <Typography>
              <T message="Прекратить уголовное преследование по нереабилитирующим основаниям можно только с согласия фигуранта дела, так как это означает добровольное признание вины и принятие последствий." />
            </Typography>
          </>
        ),
      },
      {
        title: "Совокупность преступлений",
        slug: "glossary-aggregate",
        content: (
          <>
            <Typography>
              <T message="Если следствие обвиняет человека сразу в нескольких преступлениях (см." />{" "}
              <mark>
                <a href="#glossary-main-and-additional">
                  <T message="Состав преступления" />
                </a>
              </mark>
              ), <T message="мы имеем дело с совокупностью преступлений" /> (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/58af2e09a3405b1e071f7c60a42c495a3101d8ff/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 17 УК" />
              </OutboundLink>
              ).
            </Typography>
            <ul>
              <li>
                <Typography variant="span">
                  <T message="Реальная совокупность означает, что человек последовательно совершил несколько преступлений. Например, сначала публично призывал к свержению конституционного строя, а через час сбил пешехода." />
                </Typography>{" "}
              </li>
              <li>
                <Typography variant="span">
                  <T message="Идеальная совокупность означает, что человек одним действием совершил сразу несколько преступлений. Например, прошел обучение в террористической организации" />{" "}
                  (
                  <OutboundLink
                    href="http://www.consultant.ru/document/cons_doc_LAW_10699/282fd59495bd6058210e5e1742ad117d48d015a7/#:~:text=%D0%9F%D1%80%D0%BE%D1%85%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%B2%20%D1%86%D0%B5%D0%BB%D1%8F%D1%85%20%D0%BE%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%82%D0%B5%D1%80%D1%80%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9%20%D0%B4%D0%B5%D1%8F%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8,-(%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B0%20%D0%A4%D0%B5%D0%B4%D0%B5%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC&text=%D0%BD%D0%B0%D0%BA%D0%B0%D0%B7%D1%8B%D0%B2%D0%B0%D0%B5%D1%82%D1%81%D1%8F%20%D0%BB%D0%B8%D1%88%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D1%8B%20%D0%BD%D0%B0%20%D1%81%D1%80%D0%BE%D0%BA,%D0%BB%D0%B5%D1%82%20%D0%B8%D0%BB%D0%B8%20%D0%BF%D0%BE%D0%B6%D0%B8%D0%B7%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%20%D0%BB%D0%B8%D1%88%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%20%D1%81%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D1%8B"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <T message="ст. 205.3 УК" />
                  </OutboundLink>
                  ) <T message="и одновременно в ней участвовал" /> (
                  <OutboundLink
                    href="http://www.consultant.ru/document/cons_doc_LAW_10699/67367c123b0bc5c1d141517befa1701a1f95ff6d/#:~:text=%D0%9F%D0%BE%D0%B4%20%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%BE%D0%B9%20%D1%82%D0%B5%D1%80%D1%80%D0%BE%D1%80%D0%B8%D0%B7%D0%BC%D0%B0%20%D0%B2%20%D0%BD%D0%B0%D1%81%D1%82%D0%BE%D1%8F%D1%89%D0%B5%D0%B9,%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D0%B8%2C%20%D1%81%D0%BF%D0%BE%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D1%83%D1%8E%D1%89%D0%B8%D1%85%20%D0%BE%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8E%20%D1%82%D0%B5%D1%80%D1%80%D0%BE%D1%80%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9%20%D0%B4%D0%B5%D1%8F%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <T message="ст. 205.4 УК" />
                  </OutboundLink>
                  ).
                </Typography>
              </li>
            </ul>

            <Typography>
              <T message="Такие дела — когда один или несколько человек совершают серию преступлений — могут быть объединены в одно дело и рассматриваться в суде вместе. Наказание будет вынесено за каждое совершенное преступление по соответствующей статье. В" />{" "}
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/1750f77d5ab2edf9b591ecb4451727086bda5ac0/#:~:text=%D0%9D%D0%B0%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BD%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%BF%D0%BE%20%D1%81%D0%BE%D0%B2%D0%BE%D0%BA%D1%83%D0%BF%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%BF%D1%80%D0%B5%D1%81%D1%82%D1%83%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D0%B9,-1.&text=%D0%95%D1%81%D0%BB%D0%B8%20%D1%85%D0%BE%D1%82%D1%8F%20%D0%B1%D1%8B%20%D0%BE%D0%B4%D0%BD%D0%BE%20%D0%B8%D0%B7,%D1%87%D0%B0%D1%81%D1%82%D0%B8%D1%87%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%B8%D0%BB%D0%B8%20%D0%BF%D0%BE%D0%BB%D0%BD%D0%BE%D0%B3%D0%BE%20%D1%81%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BD%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8%D0%B9"
                target="_blank"
                rel="noreferrer"
              >
                <T message="статье 69 УК" />
              </OutboundLink>{" "}
              <T message="приведена инструкция, как должны суммироваться меры наказания в зависимости от тяжести преступлений и от того, какие  наказания назначены по отдельности. Если же дела рассматривали отдельно, будет действовать правило назначения наказания по совокупности приговоров" />{" "}
              (
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/58b774fa8d30c3cba7b126049cea9fefabc8ab5b/"
                target="_blank"
                rel="noreferrer"
              >
                <T message="ст. 70 УК" />
              </OutboundLink>
              ).
            </Typography>
          </>
        ),
      },
      {
        title: "Судебный штраф",
        slug: "glossary-fine",
        content: (
          <>
            <Typography>
              <T message="Судебный штраф — это способ освобождения от уголовной ответственности и основание для прекращения дела, но не одна из мер наказания (см." />{" "}
              <mark>
                <a href="#glossary-fine">
                  <T message="Штраф" />
                </a>
              </mark>
              ).{" "}
              <T message="Если человек впервые совершил преступление небольшой или средней тяжести (за это можно получить до 5 лет лишения свободы), а затем загладил ущерб и примирился с истцом, ему могут назначить судебный штраф — тогда ответчик официально не будет судим." />
            </Typography>
            <Typography>
              <T message="Такая практика — компромисс между сторонами в уголовном процессе. Ее преимущество заключается в первую очередь в гуманности и упрощенном судопроизводстве. Это недавнее явление в российском уголовном праве — оно появилось только в 2016 году, — но применяется всe более активно. В 2017 судебный штраф был назначен более 20 тысяч раз, а уже в 2019 — более 52 тысяч." />
            </Typography>
          </>
        ),
      },
      {
        title: "Штраф",
        slug: "glossary-fine",
        content: (
          <>
            <Typography>
              <T message="Штраф — это один из видов" />{" "}
              <mark>
                <T message="наказаний" />
              </mark>
              .{" "}
              <T message="В некоторых уголовных делах он выступает как основная мера — это означает, что обвиняемый остался судим, заплатил штраф и избежал заключения. В" />{" "}
              <OutboundLink
                href="http://www.consultant.ru/document/cons_doc_LAW_10699/c35309e0a5b0291571f5f963bce56146e227835e/#dst100531"
                target="_blank"
                rel="noreferrer"
              >
                <T message="других" />
              </OutboundLink>{" "}
              <T message="случаях штраф это дополнительная мера — тогда человек отбывает более строгое наказание и в дополнение к этому выплачивает определенную сумму государству. При подсчете статистики нельзя просто сложить количество первых и вторых дел — получится путаница, так как эти данные демонстрируют разные ситуации." />
            </Typography>
            <Typography>
              <T message="Размер штрафа зависит от тяжести преступления и финансового положения осужденного. Иногда суд может назначить штраф с рассрочкой выплаты на срок до пяти лет." />
            </Typography>
          </>
        ),
      },
    ],
  },
  {
    id: "howWasCollected",
    title: "Как собирались эти данные",
    content: <FaqPageHowWasCollected />,
  },
  {
    id: "uploadFieldsNParameterTree",
    title: "Поля выгрузки и «дерево» параметров",
    content: <FaqPageUploadFieldsNParameterTree />,
  },
];

const FaqPage: React.FC = () => {
  const { t } = useLocale();
  const [activeMenuItem, setActiveMenuItem] = useState("glossary");
  // const [searchValue, setSearchValue] = useState("");

  const handleClickMenuItem = (menuItemId: string) => {
    setActiveMenuItem(menuItemId);
  };

  // const handleSearch = (e: any) => {
  //   setSearchValue(e.target.value);
  // };

  const faqData = getFaqData(t);
  const currentFaqItem = faqData.find((d) => d.id == activeMenuItem);

  return (
    <main className={cn(classes.container)}>
      <Container>
        <Helmet defer={false}>
          <title>{t("О датасете")}</title>
          <meta
            name="description"
            content={t("Как устроен проект Достоевский?")}
          />
        </Helmet>
        <SinglePageLayout>
          {/* <div className={cn(classes.searchWrapper)}>
            <Input
              type="text"
              value={searchValue}
              icon={require("./assets/search.svg")}
              placeholder={t("поиск по разделу")}
              onChange={handleSearch}
            />
          </div> */}
          <Menu variant="default" className={cn(classes.faqMenu)}>
            {faqData.map((f) => (
              <MenuItem
                key={f.id}
                onClick={() => handleClickMenuItem(f.id)}
                isActive={f.id === activeMenuItem}
              >
                <Typography isUpperCased>
                  <T message={f.title} />
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          {currentFaqItem &&
          currentFaqItem.data &&
          currentFaqItem.data.length ? (
            <div className={cn(classes.contentWrapper)}>
              {currentFaqItem.accordion ? (
                <Accordion>
                  {currentFaqItem.data.map((f, i) => (
                    <AccordionNode
                      key={i}
                      variant="secondary"
                      slug={f.slug}
                      title={f.title}
                    >
                      {f.content}
                    </AccordionNode>
                  ))}
                </Accordion>
              ) : null}
            </div>
          ) : null}
          {currentFaqItem && currentFaqItem.content ? (
            <div className={cn(classes.contentWrapper)}>
              {currentFaqItem.content}
            </div>
          ) : null}
        </SinglePageLayout>
      </Container>
    </main>
  );
};

export default FaqPage;
