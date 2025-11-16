import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  scent: string;
}

interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Лавандовая мечта",
    price: 1200,
    image: "https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/42636fb3-391c-4486-a350-b0d01107b19c.jpg",
    description: "Нежный аромат французской лаванды",
    rating: 4.8,
    reviews: 24,
    scent: "Лаванда",
  },
  {
    id: 2,
    name: "Ваниль & Амбра",
    price: 1500,
    image: "https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/076a7232-4216-4c68-9fa5-ea676792e663.jpg",
    description: "Теплый сладкий аромат с восточными нотами",
    rating: 4.9,
    reviews: 31,
    scent: "Ваниль",
  },
  {
    id: 3,
    name: "Свежий цитрус",
    price: 1100,
    image: "https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/5cdfbfe1-5274-4161-8964-091b100262cc.jpg",
    description: "Бодрящий аромат лимона и грейпфрута",
    rating: 4.7,
    reviews: 18,
    scent: "Цитрус",
  },
  {
    id: 4,
    name: "Морской бриз",
    price: 1300,
    image: "https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/5cdfbfe1-5274-4161-8964-091b100262cc.jpg",
    description: "Свежий аромат океана и соли",
    rating: 4.6,
    reviews: 15,
    scent: "Морской",
  },
  {
    id: 5,
    name: "Дымная роза",
    price: 1600,
    image: "https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/076a7232-4216-4c68-9fa5-ea676792e663.jpg",
    description: "Изысканный аромат розы с древесными нотами",
    rating: 5.0,
    reviews: 42,
    scent: "Роза",
  },
  {
    id: 6,
    name: "Сандал & Пачули",
    price: 1400,
    image: "https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/42636fb3-391c-4486-a350-b0d01107b19c.jpg",
    description: "Глубокий восточный аромат",
    rating: 4.8,
    reviews: 28,
    scent: "Восточный",
  },
];

const reviews: Review[] = [
  {
    id: 1,
    productId: 2,
    author: "Анна М.",
    rating: 5,
    text: "Божественный аромат! Свеча горит ровно, запах наполняет всю комнату. Заказала уже третью.",
    date: "15 ноября 2024",
  },
  {
    id: 2,
    productId: 1,
    author: "Дмитрий К.",
    rating: 5,
    text: "Отличное качество, лаванда очень натуральная. Помогает расслабиться вечером.",
    date: "12 ноября 2024",
  },
  {
    id: 3,
    productId: 5,
    author: "Елена П.",
    rating: 5,
    text: "Моя любимая свеча! Аромат розы очень нежный и стойкий. Упаковка премиальная.",
    date: "10 ноября 2024",
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-wide">ТорАромат</h1>
          <div className="flex items-center gap-8">
            <a href="#catalog" className="text-sm hover:text-accent transition-colors">
              Каталог
            </a>
            <a href="#about" className="text-sm hover:text-accent transition-colors">
              О бренде
            </a>
            <a href="#delivery" className="text-sm hover:text-accent transition-colors">
              Доставка
            </a>
            <a href="#contacts" className="text-sm hover:text-accent transition-colors">
              Контакты
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Icon name="ShoppingBag" size={18} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto"
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Итого:</span>
                        <span>{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              Создаём атмосферу уюта
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ароматические свечи ручной работы из натурального соевого воска. Каждая свеча — это
              история, рассказанная через аромат.
            </p>
            <Button size="lg" className="text-base px-8">
              <a href="#catalog">Смотреть коллекцию</a>
            </Button>
          </div>
        </section>

        <section id="catalog" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h3 className="text-4xl font-light mb-12 text-center">Наша коллекция</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="fill-accent text-accent" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} отзывов)
                      </span>
                    </div>
                    <h4 className="text-xl font-medium mb-2">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-light">{product.price} ₽</span>
                      <Badge variant="outline">{product.scent}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-4xl font-light mb-12 text-center">Отзывы покупателей</h3>
            <div className="grid gap-6">
              {reviews.map((review) => {
                const product = products.find((p) => p.id === review.productId);
                return (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h5 className="font-medium">{review.author}</h5>
                            <p className="text-sm text-muted-foreground">{product?.name}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={
                                i < review.rating
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm">{review.text}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-3xl">
            <h3 className="text-4xl font-light mb-8 text-center">О бренде</h3>
            <p className="text-lg text-muted-foreground text-center mb-8 leading-relaxed">
              ТорАромат — это семейная мануфактура ароматических свечей. Мы создаём каждую свечу
              вручную из натурального соевого воска, используя только качественные ароматические
              композиции. Наша миссия — дарить моменты уюта и спокойствия через силу аромата.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center mt-12">
              <div>
                <Icon name="Leaf" size={32} className="mx-auto mb-4 text-accent" />
                <h4 className="font-medium mb-2">Натуральные материалы</h4>
                <p className="text-sm text-muted-foreground">
                  Соевый воск и эфирные масла
                </p>
              </div>
              <div>
                <Icon name="Heart" size={32} className="mx-auto mb-4 text-accent" />
                <h4 className="font-medium mb-2">Ручная работа</h4>
                <p className="text-sm text-muted-foreground">
                  Каждая свеча создана с любовью
                </p>
              </div>
              <div>
                <Icon name="Sparkles" size={32} className="mx-auto mb-4 text-accent" />
                <h4 className="font-medium mb-2">Уникальные ароматы</h4>
                <p className="text-sm text-muted-foreground">
                  Авторские композиции
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="delivery" className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <h3 className="text-4xl font-light mb-8 text-center">Доставка</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Как долго доставка?</AccordionTrigger>
                <AccordionContent>
                  По Москве доставка занимает 1-2 дня. По России — от 3 до 7 дней в зависимости от
                  региона. Отправляем СДЭК и Почтой России.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Стоимость доставки?</AccordionTrigger>
                <AccordionContent>
                  По Москве курьером — 300 ₽. При заказе от 3000 ₽ — бесплатно. По России стоимость
                  рассчитывается автоматически при оформлении заказа.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Можно ли забрать самовывозом?</AccordionTrigger>
                <AccordionContent>
                  Да, у нас есть пункт самовывоза в Москве. Адрес: ул. Примерная, д. 10. Работаем
                  ежедневно с 10:00 до 20:00.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Упаковка для подарка?</AccordionTrigger>
                <AccordionContent>
                  Все свечи упакованы в красивые коробки. При желании можем добавить открытку с
                  поздравлением — укажите это в комментарии к заказу.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="contacts" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h3 className="text-4xl font-light mb-8">Контакты</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <Icon name="Mail" size={20} />
                <a href="mailto:info@toraromat.ru" className="hover:text-accent transition-colors">
                  info@toraromat.ru
                </a>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Icon name="Phone" size={20} />
                <a href="tel:+79991234567" className="hover:text-accent transition-colors">
                  +7 (999) 123-45-67
                </a>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Icon name="MapPin" size={20} />
                <span>Москва, ул. Примерная, д. 10</span>
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 ТорАромат. Все права защищены.</p>
        </div>
      </footer>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-0">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={18} className="fill-accent text-accent" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({selectedProduct.reviews} отзывов)
                  </span>
                  <Badge variant="outline" className="ml-auto">
                    {selectedProduct.scent}
                  </Badge>
                </div>
                <h3 className="text-3xl font-medium mb-3">{selectedProduct.name}</h3>
                <p className="text-muted-foreground mb-6">{selectedProduct.description}</p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-light">{selectedProduct.price} ₽</span>
                  <Button onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}>
                    Добавить в корзину
                  </Button>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h4 className="font-medium">Отзывы о товаре</h4>
                  {reviews
                    .filter((r) => r.productId === selectedProduct.id)
                    .map((review) => (
                      <div key={review.id} className="border-l-2 border-accent pl-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{review.author}</span>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={12}
                              className={
                                i < review.rating
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
