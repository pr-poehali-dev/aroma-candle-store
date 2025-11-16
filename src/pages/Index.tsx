import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: number;
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
    name: 'Лавандовый сон',
    price: 1200,
    image: 'https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/29e1d8f0-0023-4d18-83de-a5a654bb232a.jpg',
    description: 'Успокаивающий аромат лаванды для расслабления',
    rating: 4.8,
    reviews: [
      { id: 1, author: 'Анна', rating: 5, text: 'Восхитительный аромат, очень расслабляет перед сном', date: '2025-11-10' },
      { id: 2, author: 'Мария', rating: 5, text: 'Лучшая свеча которую я покупала!', date: '2025-11-08' }
    ]
  },
  {
    id: 2,
    name: 'Ванильное облако',
    price: 1350,
    image: 'https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/e4a50079-3305-4c58-b4bb-ed1886834984.jpg',
    description: 'Нежный ванильный аромат с нотками карамели',
    rating: 4.9,
    reviews: [
      { id: 3, author: 'Елена', rating: 5, text: 'Пахнет как настоящая ваниль, не приторно', date: '2025-11-12' }
    ]
  },
  {
    id: 3,
    name: 'Цветочный букет',
    price: 1500,
    image: 'https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/2dae02dd-0cc3-4bdb-9cde-e9836a0cb5c3.jpg',
    description: 'Композиция из роз, жасмина и пиона',
    rating: 4.7,
    reviews: [
      { id: 4, author: 'Ольга', rating: 5, text: 'Шикарный весенний аромат!', date: '2025-11-11' },
      { id: 5, author: 'Дарья', rating: 4, text: 'Красивая свеча, но аромат мог быть посильнее', date: '2025-11-09' }
    ]
  },
  {
    id: 4,
    name: 'Эвкалипт и мята',
    price: 1400,
    image: 'https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/29e1d8f0-0023-4d18-83de-a5a654bb232a.jpg',
    description: 'Свежий аромат для бодрости и концентрации',
    rating: 4.6,
    reviews: []
  },
  {
    id: 5,
    name: 'Сандал и кедр',
    price: 1600,
    image: 'https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/e4a50079-3305-4c58-b4bb-ed1886834984.jpg',
    description: 'Древесные ноты для уютной атмосферы',
    rating: 4.9,
    reviews: [
      { id: 6, author: 'Игорь', rating: 5, text: 'Мужской, благородный аромат', date: '2025-11-13' }
    ]
  },
  {
    id: 6,
    name: 'Апельсин и корица',
    price: 1250,
    image: 'https://cdn.poehali.dev/projects/72669bba-228d-4371-965b-7548862a0072/files/2dae02dd-0cc3-4bdb-9cde-e9836a0cb5c3.jpg',
    description: 'Теплый праздничный аромат для уюта',
    rating: 4.8,
    reviews: []
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">ТорАромат</h1>
          <nav className="hidden md:flex gap-8 text-sm">
            <a href="#catalog" className="hover:text-accent transition-colors">Каталог</a>
            <a href="#about" className="hover:text-accent transition-colors">О бренде</a>
            <a href="#delivery" className="hover:text-accent transition-colors">Доставка</a>
            <a href="#contacts" className="hover:text-accent transition-colors">Контакты</a>
          </nav>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <Icon name="ShoppingBag" size={20} />
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-light mb-6 animate-fade-in">
            Ароматы для души
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Создаём уникальные свечи из натурального воска с изысканными ароматическими композициями
          </p>
          <Button size="lg" className="text-base" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-5xl font-light text-center mb-12">Наши свечи</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews.length} {product.reviews.length === 1 ? 'отзыв' : 'отзыва'})
                    </span>
                  </div>
                  <h3 className="text-2xl mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-light">{product.price} ₽</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Отзывы
                      </Button>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-light mb-8">О бренде ТорАромат</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Мы создаём ароматические свечи из натурального соевого воска и эфирных масел высочайшего качества. 
            Каждая свеча — это произведение искусства, созданное вручную с любовью к деталям.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Наша миссия — наполнить ваш дом теплом, уютом и неповторимыми ароматами, которые создают атмосферу для особенных моментов.
          </p>
        </div>
      </section>

      <section id="delivery" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-light text-center mb-12">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Truck" size={40} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl mb-3">По Москве</h3>
                <p className="text-muted-foreground">Бесплатная доставка при заказе от 3000 ₽</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Package" size={40} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl mb-3">По России</h3>
                <p className="text-muted-foreground">Доставка СДЭК 3-7 дней</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="MapPin" size={40} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl mb-3">Самовывоз</h3>
                <p className="text-muted-foreground">Забрать заказ в нашем шоуруме</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-light mb-8">Контакты</h2>
          <div className="space-y-4 text-lg">
            <p className="flex items-center justify-center gap-3">
              <Icon name="Phone" size={20} className="text-accent" />
              <a href="tel:+79991234567" className="hover:text-accent transition-colors">+7 (999) 123-45-67</a>
            </p>
            <p className="flex items-center justify-center gap-3">
              <Icon name="Mail" size={20} className="text-accent" />
              <a href="mailto:info@toraromat.ru" className="hover:text-accent transition-colors">info@toraromat.ru</a>
            </p>
            <p className="flex items-center justify-center gap-3">
              <Icon name="MapPin" size={20} className="text-accent" />
              <span>Москва, ул. Арбат, д. 10</span>
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 ТорАромат. Все права защищены.</p>
        </div>
      </footer>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-2xl">Корзина</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col h-full">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Корзина пуста</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto space-y-4">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4 flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{item.price} ₽</p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Итого:</span>
                    <span className="text-2xl font-light">{totalPrice} ₽</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-auto">
          {selectedProduct && (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl">{selectedProduct.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="fill-accent text-accent" />
                    <span className="text-lg font-medium">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({selectedProduct.reviews.length} {selectedProduct.reviews.length === 1 ? 'отзыв' : 'отзыва'})
                  </span>
                </div>
                {selectedProduct.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {selectedProduct.reviews.map(review => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={14}
                                  className={i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.text}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('ru-RU')}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="MessageSquare" size={48} className="mx-auto mb-4" />
                    <p>Пока нет отзывов</p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
