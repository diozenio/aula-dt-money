import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { TransactionsPagination } from "@/components/TransactionsPagination";

export default function Home() {
  return (
    <div>
      <Header />
      <BodyContainer>
        <CardContainer />
        <TransactionsPagination />
      </BodyContainer>
    </div>
  );
}
