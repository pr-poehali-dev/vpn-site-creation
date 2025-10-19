import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const locations = [
  { id: 'us', name: 'США', flag: '🇺🇸', ping: 12 },
  { id: 'uk', name: 'Великобритания', flag: '🇬🇧', ping: 28 },
  { id: 'de', name: 'Германия', flag: '🇩🇪', ping: 15 },
  { id: 'jp', name: 'Япония', flag: '🇯🇵', ping: 45 },
  { id: 'sg', name: 'Сингапур', flag: '🇸🇬', ping: 52 },
];

export default function Index() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [currentIP, setCurrentIP] = useState('---.---.---.---');
  const [dataTransferred, setDataTransferred] = useState(0);

  useEffect(() => {
    if (isConnected) {
      const timer = setInterval(() => {
        setDataTransferred(prev => prev + Math.random() * 0.5);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConnected]);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      setCurrentIP(`185.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
    } else {
      setCurrentIP('---.---.---.---');
      setDataTransferred(0);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Shield" size={40} className="text-primary" />
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              SecureVPN
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Бесплатная защита вашего интернета
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 animate-scale-in bg-card border-border">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div 
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isConnected 
                      ? 'bg-secondary/20 animate-pulse-glow' 
                      : 'bg-muted/50'
                  }`}
                >
                  <Icon 
                    name={isConnected ? "ShieldCheck" : "Shield"} 
                    size={64} 
                    className={isConnected ? 'text-secondary' : 'text-muted-foreground'}
                  />
                </div>
                {isConnected && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground animate-fade-in"
                  >
                    Защищено
                  </Badge>
                )}
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Статус подключения</p>
                <p className={`text-2xl font-display font-semibold ${
                  isConnected ? 'text-secondary' : 'text-muted-foreground'
                }`}>
                  {isConnected ? 'Подключено' : 'Отключено'}
                </p>
              </div>

              <Button
                onClick={toggleConnection}
                size="lg"
                className={`w-full h-14 text-lg font-display font-semibold transition-all duration-300 ${
                  isConnected 
                    ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                {isConnected ? 'Отключиться' : 'Подключиться'}
              </Button>

              <div className="w-full space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Globe" size={18} />
                    <span className="text-sm">Ваш IP</span>
                  </div>
                  <span className="font-mono text-sm text-foreground">{currentIP}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="MapPin" size={18} />
                    <span className="text-sm">Локация</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{selectedLocation.flag}</span>
                    <span className="text-sm text-foreground">{selectedLocation.name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="ArrowDownUp" size={18} />
                    <span className="text-sm">Передано</span>
                  </div>
                  <span className="font-mono text-sm text-foreground">
                    {dataTransferred.toFixed(2)} МБ
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground flex items-center gap-2">
                <Icon name="MapPin" size={24} className="text-primary" />
                Выберите сервер
              </h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => !isConnected && setSelectedLocation(location)}
                    disabled={isConnected}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                      selectedLocation.id === location.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-muted/30 hover:bg-muted/50'
                    } ${isConnected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{location.flag}</span>
                        <span className="font-medium text-foreground">{location.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Wifi" size={16} className="text-secondary" />
                        <span className="text-sm text-muted-foreground">{location.ping}ms</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="flex items-start gap-3">
                <Icon name="Zap" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-2">
                    100% Бесплатно
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Безлимитный трафик, без регистрации и подписок. 
                    Ваша конфиденциальность защищена военным шифрованием.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
